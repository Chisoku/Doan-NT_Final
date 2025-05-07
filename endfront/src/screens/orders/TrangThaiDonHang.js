import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon cho nút back
import Top from "../../components/Top";

const TrangThaiDonHang = ({ navigation }) => {
  const orderStatus = [
    { id: 1, title: "Xác nhận đơn hàng", time: "02 Tháng 02, 2025 - 9:48", completed: true },
    { id: 2, title: "Đang chuẩn bị đơn hàng", time: "02 Tháng 02, 2025", completed: false },
    { id: 3, title: "Đơn đã sẵn sàng giao", time: "02 Tháng 02, 2025", completed: false },
    { id: 4, title: "Đang vận chuyển", time: "02 Tháng 02, 2025", completed: false, link: "Xem vị trí shipper" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Top title="Trạng thái đơn hàng" showBackButton={true} showCartIcon={false} />

      {/* Nội dung */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.deliveryTime}>
          Thời gian giao hàng dự kiến: <Text style={styles.deliveryDate}>02 Th03 - 05 Th03</Text>
        </Text>

        {/* Danh sách trạng thái đơn hàng */}
        <View style={styles.timeline}>
          {orderStatus.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              {/* Dấu chấm trạng thái */}
              <View style={styles.timelineIconContainer}>
                <View style={[styles.timelineIcon, item.completed && styles.timelineIconActive]} />
                {index !== orderStatus.length - 1 && <View style={styles.timelineLine} />}
              </View>

              {/* Nội dung trạng thái */}
              <View style={styles.statusTextContainer}>
                <Text style={[styles.statusTitle, item.completed && styles.statusTitleActive]}>
                  {item.title}
                </Text>
                <Text style={styles.statusTime}>{item.time}</Text>

                {item.link && (
                  <TouchableOpacity onPress={() => navigation.navigate("ViTriShipper")}>
                    <Text style={styles.statusLink}>{item.link}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TrangThaiDonHang;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  content: { padding: 16 },
  deliveryTime: { fontSize: 14, fontWeight: "bold", color: "#333" },
  deliveryDate: { color: "#2DAF6B" },
  
  // Timeline
  timeline: { marginTop: 20, paddingLeft: 20 },
  timelineItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: 24 },
  timelineIconContainer: { alignItems: "center", width: 40 },
  timelineIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  timelineIconActive: { backgroundColor: "#2DAF6B" },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: "#ccc",
    marginTop: 4,
  },
  statusTextContainer: { flex: 1 },
  statusTitle: { fontSize: 16, color: "#aaa" },
  statusTitleActive: { color: "#2DAF6B", fontWeight: "bold" },
  statusTime: { fontSize: 12, color: "#888" },
  statusLink: { fontSize: 12, color: "#A30846", marginTop: 4, fontWeight: "bold" },
});