import React, { useState, useRef } from "react";
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

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(["", "", "", ""]); // Mã OTP gồm 4 ký tự
  const inputs = useRef([]); // Tham chiếu đến các ô nhập liệu

  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo nếu có
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerifyEmail = () => {
    const otpCode = otp.join(""); // Ghép các ký tự thành mã OTP hoàn chỉnh
    console.log("Mã xác nhận:", otpCode);
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
          <Text style={styles.title}>Xác nhận email</Text>
          <Text style={styles.subtitle}>
            Nhập mã xác nhận đã được gửi đến email của bạn
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>MÃ XÁC NHẬN</Text>
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1} // Chỉ cho phép nhập 1 ký tự
                value={value}
                onChangeText={(text) => handleInputChange(text, index)}
                ref={(ref) => (inputs.current[index] = ref)} // Lưu tham chiếu đến ô nhập liệu
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleVerifyEmail}>
            <Text style={styles.buttonText}>XÁC NHẬN</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Gửi lại mã OTP")}>
            <Text style={styles.resendText}>
              Không nhận được mã?{" "}
              <Text style={styles.resendLink}>Gửi lại</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EmailVerificationScreen;

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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: "#F3F4F6",
    width: 70,
    height: 70,
    borderRadius: 12,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
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
  resendText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
  resendLink: {
    color: "#A30846",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});