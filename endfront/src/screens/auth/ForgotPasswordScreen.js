import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    // Thêm logic xử lý quên mật khẩu tại đây
    console.log("Yêu cầu đặt lại mật khẩu đã được gửi!");
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/Auth/log.png")} // Đường dẫn đến hình ảnh nền
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Nút quay lại */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Login")} // Điều hướng về màn hình đăng nhập
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Quên mật khẩu</Text>
          <Text style={styles.subtitle}>
            Nhập email của bạn để đặt lại mật khẩu
          </Text>
        </View>

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

          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>GỬI YÊU CẦU</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    top: 40, // Khoảng cách từ trên cùng
    left: 20, // Khoảng cách từ bên trái
    zIndex: 10, // Đảm bảo nút nằm trên các thành phần khác
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 65,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
    opacity: 0.6,
  },
  formContainer: {
    flex: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
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
  button: {
    backgroundColor: "#A30846",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 17,
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 9,
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
  registerLink: {
    color: "#A30846",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});