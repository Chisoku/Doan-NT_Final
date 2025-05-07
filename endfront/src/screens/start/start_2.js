import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

export default function Start2({ onFinish }) {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground source={require("../../../assets/img/start/start_2.png")} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeIn }]}>
        <Text style={styles.title}>Đặt hoa nhanh chóng, giao tận tay. Mang yêu thương đến mọi nhà!</Text>
        <Text style={styles.description}>
          Đặt hàng mạnh lên đặt skibidi, chibidi, sigma, hôm nay chời đẹp quá, âm u, ắng năng có đi đặt đi đặt đi đặt đi đặt đi đặt đi đặt đi đặt đi đừng ngần ngại chi em... Skidibi toile, Sigma Boy
        </Text>
        <TouchableOpacity style={styles.button} onPress={onFinish}>
          <Text style={styles.buttonText}>Tiếp tục
            
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingTop: 100,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF4081",
  },
  description: {
    color: "white",
    fontSize: 18,
    marginTop: 50,
    opacity: 0.6,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF80AB",
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginTop: 300,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});