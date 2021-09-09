from flask import Flask, request, Response, jsonify
import base64
import numpy as np
import cv2
from PIL import Image
from io import BytesIO
from matplotlib import colors
import datetime
import os
from google.cloud import storage
from werkzeug.utils import secure_filename
from numpy.lib.npyio import save

upload_folder = './static/'

def datetime_():
    now = datetime.datetime.now()
    return now.strftime('%Y%m%d%H%M%S')

def save_img(img, image_name):
    os.makedirs(upload_folder, exist_ok=True)  # 폴더가 없을 경우 생성
    image_location = os.path.join(upload_folder + secure_filename(image_name))
    Image.fromarray(img).save(image_location)
    return image_location

def upload_blob(source_file_name, blob_name):
    storage_client = storage.Client()
    bucket = storage_client.bucket('linist_1')
    blob = bucket.blob(blob_name)

    blob.upload_from_filename(source_file_name)

def removeAllFile(filePath):
    if os.path.exists(filePath):
        for file in os.scandir(filePath):
            os.remove(file.path)

confthres = 0.1
nmsthres = 0.1

app = Flask(__name__)


@app.route('/', methods=['GET','POST'])
def ex():
    labelsPath="./model/obj.names"
    configPath="./model/yolov3.cfg"
    weightsPath="./model/yolov3_last.weights"
    print("모델 로딩 중이다.")
    LABELS = open(labelsPath).read().strip().split('\n')
    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

    #앵귤러
    #file = request.form['image']
    #form.get
    #file = request.form.get('image', False)
    #starter = file.find(',')
    #image_data = file[starter+1:]
    #image_data = bytes(image_data, encoding="ascii")
    #img = Image.open(BytesIO(base64.b64decode(image_data)))

    #리액트
    image = request.files['image'].read()
    img = Image.open(BytesIO(image))

    #img = cv2.imread("./static/ex11.jpg") #예시
    img = np.array(img)
    npimg = np.array(img)
    image = npimg.copy()
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    (H, W) = image.shape[:2]

    ln = net.getLayerNames()
    ln = [ln[i[0]-1] for i in net.getUnconnectedOutLayers()]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)

    net.setInput(blob)
    outs = net.forward(ln)

    boxes = []
    confidences = []
    classes = []

    for output in outs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if confidence > confthres:
                box = detection[0:4]* np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                x = int(centerX-(width / 2))
                y = int(centerY-(width / 2))

                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classes.append(int(class_id))

    print(classes)
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres, nmsthres)

    #if len(idxs) > 0:
        #for i in idxs.flatten():
            #results.append({'class': classes[i], 'confidence': confidences})

    font = cv2.FONT_HERSHEY_PLAIN
    if len(idxs) > 0:
        for i in idxs.flatten():
            x, y, w, h = boxes[i]
            label = str(LABELS[classes[class_id]])
            if classes[class_id] < 5:
                color = [0, 0, 255]
            else:
                color = [0, 125, 255]
            cv2.rectangle(img, (x+w, y+h), (x, y), color , 2)
            cv2.putText(img, label, (x, y + 30), font, 1, (0, 0, 0), 2)
    
    img_name = datetime_() + '.png'
    img_location = save_img(img, img_name)

    upload_blob(img_location, img_name)
    img_url = 'https://storage.googleapis.com/linist_1/' + img_name
    removeAllFile(upload_folder)
    return img_url


if __name__ =='__main__':
    app.run(debug=True, host='0.0.0.0')

    