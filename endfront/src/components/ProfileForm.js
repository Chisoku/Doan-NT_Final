// components/ProfileForm.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const ProfileForm = ({ name, setName, phone, setPhone }) => (
  <View style={styles.formContainer}>
    <Text style={styles.label}>HỌ VÀ TÊN</Text>
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={setName}
    />
    <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
    <TextInput
      style={styles.input}
      value={phone}
      onChangeText={setPhone}
      keyboardType="phone-pad"
    />
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    color: "#666",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 10,
 CGFloat: 15,
    color: "black",
  },
});

export default ProfileForm;