// components/auth/LoginForm.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  hidePassword,
  setHidePassword,
}) => (
  <View style={styles.formContainer}>
    <Text style={styles.label}>EMAIL</Text>
    <TextInput
      style={styles.input}
      keyboardType="email-address"
      placeholder="example@gmail.com"
      value={email}
      onChangeText={setEmail}
      placeholderTextColor="#B0B0B0"
    />

    <Text style={styles.label}>MẬT KHẨU</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputPassword}
        secureTextEntry={hidePassword}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        placeholderTextColor="#B0B0B0"
      />
      <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? "eye-off" : "eye"} size={22} color="#666" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
    height: 60,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 60,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default LoginForm;