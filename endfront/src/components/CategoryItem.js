// components/CategoryItem.js
import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = (width - 50) / 2;

const CategoryItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Image source={item.image} style={styles.categoryImage} />
    <Text style={styles.categoryName}>{item.name}</Text>
    <Text style={styles.categoryDescription}>{item.description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryItem: {
    width: ITEM_WIDTH,
    backgroundColor: "#F8F9FB",
    margin: width * 0.02,
    borderRadius: 15,
    padding: height * 0.02,
    alignItems: "center",
    elevation: 3,
    marginTop: 15,
  },
  categoryImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 15,
  },
  categoryName: {
    marginTop: height * 0.01,
    fontSize: height * 0.018,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  categoryDescription: {
    fontSize: height * 0.015,
    color: "#777",
    marginTop: height * 0.005,
    textAlign: "center",
  },
});

export default CategoryItem;
