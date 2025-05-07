// components/ProfileHeader.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileHeader = ({ user }) => (
  <View style={styles.header}>
    <Image
      source={{ uri: user.avatar }}
      style={styles.avatar}
    />
    <Text style={styles.username}>
      {user.name || "Tên người dùng"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A30846",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "white",
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ProfileHeader;