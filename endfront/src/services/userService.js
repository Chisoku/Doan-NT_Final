// services/userService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export const fetchUserInfo = async (userId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error.message);
    throw error;
  }
};

export const updateUserInfo = async (userId, userData) => {
  try {
    const token = awaitDPAsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin:", error.message);
    throw error;
  }
};