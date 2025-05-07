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

const DangKy = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState(""); // Thêm Họ và Tên
  const [phoneNumber, setPhoneNumber] = useState(""); // Thêm Số Điện Thoại
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleRegister = () => {
    // Thêm logic kiểm tra và xử lý đăng ký tại đây
    console.log("Đăng ký thành công!");
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
          <Text style={styles.title}>Đăng ký</Text>
          <Text style={styles.subtitle}>Tạo tài khoản mới của bạn</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>HỌ VÀ TÊN</Text>
          <TextInput
            style={styles.input}
            placeholder="Nguyễn Văn A"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#B0B0B0"
          />

          <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="(+84) 123 456 789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="#B0B0B0"
          />

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

          <Text style={styles.label}>XÁC NHẬN MẬT KHẨU</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              secureTextEntry={hideConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor="#B0B0B0"
            />
            <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
              <Ionicons name={hideConfirmPassword ? "eye-off" : "eye"} size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>
              Đã có tài khoản? <Text style={styles.registerLink}>ĐĂNG NHẬP</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DangKy;

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
    flex: 3.5,
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
    padding: 9
  },
  registerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    paddingTop: 12
  },
  registerLink: {
    color: "#A30846",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});