import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext"; // Import CartContext


import Top from "../../components/Top";

const NotificationScreen = ({ navigation }) => {
  const { getCartCount } = useCart(); // Lấy số lượng sản phẩm trong giỏ hàng

  const notifications = [
    {
      id: 1,
      title: "Nhắc nhở: Đơn đã nhận được hàng chưa?",
      message:
        "Nếu bạn đã nhận đơn hàng đúng như đặt, vui lòng xác nhận đơn hàng đã giao thành công cho người bán trước ngày 14-03-2025.",
      time: "14-03-2025",
    },
    {
      id: 2,
      title: "Đơn hàng hoàn thành công",
      message:
        "Chúc mừng! Đơn hàng #202503723066899 của bạn đã giao thành công.",
      time: "14-03-2025",
    },
    {
      id: 3,
      title: "Nhắc nhở: Đơn đã nhận được hàng chưa?",
      message:
        "Nếu bạn đã nhận đơn hàng đúng như đặt, vui lòng xác nhận đơn hàng đã giao thành công cho người bán trước ngày 14-03-2025.",
      time: "14-03-2025",
    },
    {
      id: 4,
      title: "Đơn hàng hoàn thành công",
      message:
        "Chúc mừng! Đơn hàng #202503723066899 của bạn đã giao thành công. Shopee đã thanh toán cho người bán.",
      time: "14-03-2025",
    },
    {
      id: 5,
      title: "Đơn hàng hoàn thành công",
      message:
        "Chúc mừng! Đơn hàng #202503723066899 của bạn đã giao thành công.",
      time: "14-03-2025",
    },
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Ẩn header mặc định
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Top title="Thông báo" /> 

      {/* Danh sách thông báo */}
      <ScrollView style={styles.scrollView}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={24} color="#000" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>
                {notification.message}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: -45
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  iconContainer: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  notificationMessage: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999999",
  },
});

export default NotificationScreen;