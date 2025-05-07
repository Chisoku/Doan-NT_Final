// components/auth/NavigationLinks.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavigationLinks = () => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          Bro chưa có tài khoản? <Text style={styles.registerLink}>ĐĂNG KÍ</Text>
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    textAlign: "right",
    color: "#A30846",
    marginTop: 5,
    fontSize: 14,
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    padding: 20,
  },
  registerLink: {
    color: "#A30846",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default NavigationLinks;