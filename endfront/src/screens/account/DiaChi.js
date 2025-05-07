import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Top from "../../components/Top";
import AddressCard from "../../components/AddressCard";
import { fetchUserInfo } from "../../services/userService";

const DiaChi = ({ navigation }) => {
  const [address, setAddress] = useState("Đang tải...");

  const loadUserInfo = useCallback(async () => {
    try {
      const user = await fetchUserInfo(12);
      setAddress(user.address || "Không có địa chỉ");
    } catch {
      setAddress("Lỗi khi tải địa chỉ");
    }
  }, []);

  useFocusEffect(loadUserInfo);

  return (
    <View style={styles.container}>
      <Top title="Địa chỉ" showBackButton />
      <AddressCard
        address={address}
        onEdit={() => navigation.navigate("ChinhSuaDiaChi")}
      />
    </View>
  );
};

export default DiaChi;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});