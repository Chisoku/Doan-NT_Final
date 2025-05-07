// services/authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    throw error;
  }
};