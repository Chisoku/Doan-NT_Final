import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DoiMatKhau = ({ navigation }) => {
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [nhapLaiMatKhau, setNhapLaiMatKhau] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleDoiMatKhau = () => {
    navigation.navigate("DoiMatKhauHoanThanh");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
      </View>

      {/* Form nhập mật khẩu */}
      <View style={styles.form}>
        <Text style={styles.label}>MẬT KHẨU MỚI</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={hidePassword}
            value={matKhauMoi}
            onChangeText={setMatKhauMoi}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "eye-off" : "eye"} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>NHẬP LẠI MẬT KHẨU</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            secureTextEntry={hidePassword}
            value={nhapLaiMatKhau}
            onChangeText={setNhapLaiMatKhau}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "eye-off" : "eye"} size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nút đổi mật khẩu */}
      <TouchableOpacity style={styles.button} onPress={handleDoiMatKhau}>
        <Text style={styles.buttonText}>ĐỔI MẬT KHẨU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoiMatKhau;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#A30846",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  form: { margin: 16 },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5, color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  button: {
    backgroundColor: "#A30846",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});