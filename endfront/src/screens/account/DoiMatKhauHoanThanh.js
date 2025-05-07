import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Top from "../../components/Top";

const DoiMatKhauHoanThanh = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Profile"); // Quay lại trang Profile sau 2 giây
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ĐỔI MẬT KHẨU THÀNH CÔNG </Text>
    </View>
  );
};

export default DoiMatKhauHoanThanh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A30846",
  },
});
