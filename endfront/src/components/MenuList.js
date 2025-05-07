// components/MenuList.js
import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const menuItems = [
  { icon: "user", title: "Tài khoản", screen: "TaiKhoan" },
  { icon: "shopping-cart", title: "Đơn mua", screen: "DonDaMua" },
  { icon: "map-marker-alt", title: "Địa chỉ", screen: "DiaChi" },
  { icon: "cog", title: "Cài đặt" },
  { icon: "file-alt", title: "Bí mật" },
  { icon: "lock", title: "Đổi mật khẩu", screen: "DoiMatKhau" },
  { icon: "question-circle", title: "Trung tâm trợ giúp", screen: "TrungTamHoTro" },
  { icon: "sign-out-alt", title: "Đăng xuất", screen: "DangXuat", color: "red" },
];

const MenuList = ({ navigation }) => (
  <ScrollView style={styles.menuContainer}>
    {menuItems.map(({ icon, title, screen, color = "#C2185B" }, index) => (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={screen ? () => navigation.navigate(screen) : undefined}
        disabled={!screen}
      >
        <Icon name={icon} size={18} color={color} style={styles.menuIcon} />
        <Text style={[styles.menuText, { color }]}>{title}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  menuContainer: { marginTop: 10 },
  menuItem: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  menuIcon: { marginRight: 15 },
  menuText: { fontSize: 16, fontWeight: "500" },
});

export default MenuList;