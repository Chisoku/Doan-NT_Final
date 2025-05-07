// components/auth/SocialLoginButtons.js
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SocialLoginButtons = () => (
  <View style={styles.socialContainer}>
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#3b5998" }]}>
      <Ionicons name="logo-facebook" size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]}>
      <Ionicons name="logo-twitter" size={24} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.socialButton, { backgroundColor: "#000" }]}>
      <Ionicons name="logo-apple" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default SocialLoginButtons;