import React from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Start1() {
    const navigation = useNavigation();

    const handleNext = () => {
      navigation.navigate("Start2"); // Điều hướng sang màn hình Start2
    };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNext}>
      <ImageBackground
        source={require("../../../assets/img/start/start_1.jpg")} // Đường dẫn đến hình ảnh
        style={styles.background}
        resizeMode="cover" // Đảm bảo hình ảnh bao phủ toàn bộ màn hình
      >
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center", // Đặt nội dung ở giữa màn hình
    alignItems: "center",
  },
});