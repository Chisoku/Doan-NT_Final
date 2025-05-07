// services/authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";
import { Alert } from "react-native";

export const handleLogin = async (email, password, setIsLoggedIn, navigation) => {
  if (!email || !password) {
    Alert.alert("Thông báo", "Vui lòng nhập đầy đủ email và mật khẩu");
    return;
  }

  try {
    console.log("Gọi API đăng nhập với email:", email, "và mật khẩu:", password);

    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert("Đăng nhập thất bại", errorData.message || "Email hoặc mật khẩu sai");
      return;
    }

    const data = await response.json();
    console.log("Kết quả từ API:", data.accessToken);

    if (data.accessToken) {
      await AsyncStorage.setItem("token", data.accessToken);
      setIsLoggedIn(true);
      navigation.navigate("ProfileScreen", { userId: data.userId });
    } else {
      Alert.alert("Lỗi", "Không nhận được token từ server");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    Alert.alert("Lỗi", "Không thể kết nối đến máy chủ");
  }
};

export const showToken = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("🔑 Token đang lưu:", token);
};