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


import Top from "../../components/Top";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");Q
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    // Thêm logic đổi mật khẩu tại đây
    console.log("Đổi mật khẩu thành công!");
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
          onPress={() => navigation.goBack()} // Quay lại màn hình trước
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Đổi mật khẩu</Text>
          <Text style={styles.subtitle}>
            Nhập thông tin để đổi mật khẩu của bạn
          </Text>
        </View>

        <View style={styles.formContainer}>
 

          <Text style={styles.label}>MẬT KHẨU MỚI</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              secureTextEntry={hideNewPassword}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#B0B0B0"
            />
            <TouchableOpacity onPress={() => setHideNewPassword(!hideNewPassword)}>
              <Ionicons
                name={hideNewPassword ? "eye-off" : "eye"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>XÁC NHẬN MẬT KHẨU MỚI</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              secureTextEntry={hideConfirmPassword}
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#B0B0B0"
            />
            <TouchableOpacity
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
            >
              <Ionicons
                name={hideConfirmPassword ? "eye-off" : "eye"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>ĐỔI MẬT KHẨU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

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
    top: 40,
    left: 20,
    zIndex: 10,
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
    padding: 9,
  },
});