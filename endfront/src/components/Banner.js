import React from "react";
import { View, Image, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Banner() {
  return (
    <View>
      <Image
        source={require("../../assets/img/Auth/Wall.jpg")}
        style={{
          width: width * 0.92,
          height: height * 0.2,
          borderRadius: 10,
          alignSelf: "center",
          marginBottom: height * 0.02,
          marginTop: 25,
        }}
        resizeMode="cover"
      />

      <Text
        style={{
          fontSize: height * 0.025,
          fontWeight: "bold",
          paddingHorizontal: width * 0.05,
          marginTop: height * 0.015,
          color: "#6E253F",
        }}
      >
        Sản phẩm bán chạy
      </Text>
    </View>
  );
}
