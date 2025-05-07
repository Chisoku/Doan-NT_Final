// components/AvatarSection.js
import React from "react";
import { View, Image, StyleSheet } from "react-native";

const AvatarSection = ({ avatar }) => (
  <View style={styles.avatarContainer}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    {/* Nếu muốn thêm nút chỉnh sửa avatar, bỏ comment đoạn sau
    <TouchableOpacity style={styles.editAvatarButton}>
      <Icon name="pen" size={14} color="white" />
    </TouchableOpacity>
    */}
  </View>
);

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 130,
    backgroundColor: "#FF7B54",
    borderRadius: 20,
    padding: 5,
  },
});

export default AvatarSection;