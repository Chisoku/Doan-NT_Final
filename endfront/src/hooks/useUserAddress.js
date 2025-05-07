// hooks/useUserAddress.js

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

// Custom hook để xử lý địa chỉ người dùng
const useUserAddress = () => {
  const [diaChi, setDiaChi] = useState(""); // state để lưu địa chỉ
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy thông tin địa chỉ người dùng
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/users/12`, {
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
      const data = result.data;

      setDiaChi(data.address || "");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Cập nhật địa chỉ
  const updateAddress = async (newAddress) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/users/12`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
      }

      alert("Cập nhật địa chỉ thành công!");
    } catch (error) {
      setError(error.message);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return {
    diaChi,
    setDiaChi,
    fetchUserInfo,
    updateAddress,
    loading,
    error,
  };
};

export default useUserAddress;
