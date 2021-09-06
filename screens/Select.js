import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { TouchableHighlight } from "react-native";

export default function Select({ navigation }) {
  const pressHandler = () => {
    navigation.navigate("Result");
  };

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.Result}>
        <Image source={{}} />
      </View>
      <TouchableHighlight onPress={pressHandler}>
        <View style={styles.btncontainer}>
          <Text style={styles.btntext}>물품 검사하기</Text>
        </View>
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Result: {
    width: 300,
    height: 270,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 300,
  },

  btncontainer: {
    width: 340,
    height: 48,
    backgroundColor: "#FEE896",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    lineHeight: 48,
    marginTop: 327,
    shadowColor: "#333333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  btntext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 10,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});