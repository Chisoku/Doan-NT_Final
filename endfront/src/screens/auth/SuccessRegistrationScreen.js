import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessRegistrationScreen = () => {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate("Login"); // Điều hướng về màn hình đăng nhập
  };

  return (
    <ImageBackground
      source={require("../../../assets/img/Auth/log.png")} // Đường dẫn đến hình ảnh nền
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Biểu tượng thành công */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../assets/img/Auth/success.png")} // Đường dẫn đến biểu tượng thành công
            style={styles.icon}
          />
        </View>

        {/* Thông báo */}
        <Text style={styles.title}>Đăng ký thành công!</Text>
        <Text style={styles.subtitle}>
          Tài khoản của bạn đã được tạo thành công. Hãy tiếp tục!
        </Text>

        {/* Nút quay lại màn hình đăng nhập */}
        <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
          <Text style={styles.buttonText}>TIẾP TỤC</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SuccessRegistrationScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  icon: {
    width: 110,
    height: 110,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.8,
  },
  button: {
    backgroundColor: "#A30846",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 17,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 9
  },
});