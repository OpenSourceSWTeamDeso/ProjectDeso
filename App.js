import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { TouchableHighlight } from 'react-native';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';




export default function App() {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


 const openCamera = async () => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've refused to allow this appp to access your camera!");
    return;
  }

  const result = await ImagePicker.launchCameraAsync();

  // Explore the result
  console.log(result);

  if (!result.cancelled) {
    setPickedImagePath(result.uri);
    console.log(result.uri);
  }
}


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  return (
      <View style={styles.container}>
       <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={styles.image}>
      <Image source={require("./assets/airplane.png")} style={styles.airplane}/>
      <Text style={styles.text1}>설레는 항공 여행을 앞두고 계신가요?</Text>
      <Text style={styles.text2}>Flight-Helper는 여러분의 원활한 여행을 위해 기내 </Text>
      <Text style={styles.text2}>반입 금지 물품 선별을 도와드리는 서비스 입니다. </Text>
      <Text style={styles.text2}>Flight-Helper와 함께 꼼꼼한 여행 준비를 해보세요! </Text>
      <TouchableHighlight onPress={openCamera}>
        <View style={styles.btncontainer}>
          <Text style={styles.btntext}>사진 촬영하기</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={pickImage}>
        <View style={styles.btncontainer2}>
          <Text style={styles.btntext2}>갤러리에서 사진 불러오기</Text>
        </View>
      </TouchableHighlight>
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    width: "100%",
    height: 600,
    flexDirection: 'column',
  },

  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -.5, height: .5},
    textShadowRadius: 10
  },

  text2: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -.5, height: .5},
    textShadowRadius: 10
  },

  image: {
    width: '100%', height: '100%'
  },

  airplane: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 260
  },

  btncontainer: {
    width: 340,
    height: 48,
    backgroundColor: '#FEE896',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    lineHeight: 48,
    marginTop: 190,
    shadowColor: '#333333',
    shadowOffset: {
	    width: 0,
	    height: 1,
      },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
   },

    btntext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: {width: -.5, height: .5},
    textShadowRadius: 10
  },

  btncontainer2: {
    width: 340,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#D0D0D0',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    lineHeight: 48,
    marginTop: 190,
    shadowColor: '#C8C8C8',
    shadowOffset: {
	    width: 0,
	    height: .5,
      },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginTop: 16
  },

  btntext2: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#AFAFAF',
      textShadowColor: 'rgba(0, 0, 0, 0.1)',
      textShadowOffset: {width: -.5, height: .5},
      textShadowRadius: 10
  }
});
