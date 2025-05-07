// services/addressService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export const updateUserAddress = async (userId, address) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address, // Gửi thông tin địa chỉ mới
      }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật địa chỉ:", error.message);
    throw error;
  }
};