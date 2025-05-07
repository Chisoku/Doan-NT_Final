import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchProducts = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Throw error để xử lý tại nơi gọi
  }
};
