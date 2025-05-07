import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Top from "../../components/Top";
import AvatarSection from "../../components/AvatarSection";
import ProfileForm from "../../components/ProfileForm";
import { fetchUserInfo, updateUserInfo } from "../../services/userService";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const userId = params?.userId || 12;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await fetchUserInfo(userId);
        setName(user.name || "");
        setPhone(user.phone || "");
        setAvatar(user.avatar || null);
      } catch {
        // Có thể thêm thông báo lỗi nếu cần
      }
    };
    loadUserInfo();
  }, [userId]);

  const handleSave = async () => {
    try {
      await updateUserInfo(userId, { name, phone });
      navigation.goBack();
    } catch {
      // Có thể thêm thông báo lỗi nếu cần
    }
  };

  return (
    <View style={styles.container}>
      <Top title="Sửa tài khoản" showBackButton />
      <AvatarSection avatar={avatar} />
      <ProfileForm name={name} setName={setName} phone={phone} setPhone={setPhone} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>LƯU</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  saveButton: {
    backgroundColor: "#A30846",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;