import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../config"; // sửa lại đường dẫn nếu cần

const { width, height } = Dimensions.get("window");

const formatPrice = (price) => price.toLocaleString("vi-VN") + " VND";


export default function ProductItem({ item, navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#F8F9FB",
        padding: height * 0.020,
        borderRadius: 15,
        flex: 1,
        margin: width * 0.02,
        alignItems: "flex-start",
        elevation: 3,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetailScreen", { flower: item })
        }
      >
        <Image
          source={{ uri: `${BASE_URL}/${item.image.replace(/\\/g, '/')}` }}
          defaultSource={require("../../assets/images/anh-meo-cute-5.png")}
          style={{
            width: width * 0.35,
            height: width * 0.35,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: height * 0.016,
          fontWeight: "bold",
          marginTop: height * 0.01,
          color: "#333",
        }}
      >
        {item.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: height * 0.01,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "#F05C18",
            fontSize: height * 0.015,
            fontWeight: "600",
          }}
        >
          {formatPrice(item.price)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F7F7CA",
            padding: 2,
            paddingHorizontal: 9,
            borderRadius: 30,
          }}
        >
          <Ionicons name="star" size={height * 0.012} color="#FBC605" />
          <Text
            style={{
              marginLeft: 5,
              fontSize: height * 0.012,
              fontWeight: "200",
            }}
          >
            4.5
          </Text>
        </View>
      </View>
    </View>
  );
}
