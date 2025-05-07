import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native"; // Nhớ cài package 'react-native-async-storage/async-storage'
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Decode token để kiểm tra hạn
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;
          if (decoded.exp > now) {
            setUser(decoded); // Lưu thông tin người dùng từ token
          } else {
            await AsyncStorage.removeItem("token"); // Token hết hạn
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy hoặc decode token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded); // Lưu thông tin người dùng từ token
    } catch (error) {
      console.error("Lỗi khi lưu token:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Lỗi khi xóa token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
