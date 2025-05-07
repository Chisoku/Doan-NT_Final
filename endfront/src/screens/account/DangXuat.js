import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfirmModal from "../../components/ConfirmModal";
import { logout } from "../../services/logoutService";

const DangXuat = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      Alert.alert("Đăng xuất", "Bạn đã đăng xuất thành công.");
    } catch {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi đăng xuất.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <ConfirmModal
        title="Đăng xuất"
        message="Bạn có chắc muốn đăng xuất không?"
        onConfirm={handleLogout}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

export default DangXuat;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 0, 0.4)" },
});