import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config"; // Đảm bảo BASE_URL đúng

import Top from "../../components/Top";

const DonDaMua = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState("paid");

  const [orders, setOrders] = useState([]);

    // Fetch đơn hàng theo userId và trạng thái "pending"
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
        const userId = await AsyncStorage.getItem("userId"); // Lấy userId từ AsyncStorage (hoặc từ route params nếu có)
  
        // if (!userId) {
        //   console.error("User ID không tồn tại");
        //   return;
        // }
        const response = await fetch(`${BASE_URL}/api/orders/user/12`, {
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
        setOrders(result.data); // Giả sử response chứa danh sách đơn hàng trong result.data
        console.error("User ID không tồn tại", result);
        
  
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error.message);
      }
    };
  
    useEffect(() => {
      fetchOrders(); // Gọi API khi component mount
    }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Top title="Đơn đã mua" showBackButton={true} />

      {/* Tabs */}
      <View style={styles.tabs}>
  <TouchableOpacity onPress={() => setTab("paid")}>
    <Text style={[styles.tabText, tab === "paid" && styles.activeTab]}>Đang giao</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setTab("success")}>
    <Text style={[styles.tabText, tab === "success" && styles.activeTab]}>Đã giao</Text>
  </TouchableOpacity>
</View>


<FlatList
  data={orders.filter((order) => order.status === tab)}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => navigation.navigate('OrderDetailScreen', { orderId: item.id })} // Điều hướng đến màn hình chi tiết đơn hàng
    >
    
      <Image
        source={require("../../../assets/ship.png")}
        style={styles.image}
      />

      <View style={styles.orderInfo}>
        <Text style={styles.orderName}>ĐƠN HÀNG MÃ SỐ: {item.id}</Text>
        <Text style={styles.orderTotal}>
          Tổng: {item.total_price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </Text>

        <Text style={styles.orderTime}>
          {item.status === "success"
            ? `Giao hàng thành công vào ${new Date(item.updatedAt).toLocaleString("vi-VN")}`
            : "Thời gian giao hàng dự kiến 3 giây"}
        </Text>

        <View style={styles.buttonContainer}>
          {item.status === "success" ? (
            <>
              {/* <TouchableOpacity
                style={styles.buttonOutline}
                onPress={() => navigation.navigate("ProductDetailScreen", { flower: item })}
              >
                <Text style={styles.buttonText}>Mua lại</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => navigation.navigate("DanhGiaSanPham")}
              >
                <Text style={styles.buttonPrimaryText}>Đánh giá</Text>
              </TouchableOpacity> */}
            </>
          ) : (
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => navigation.navigate("TrangThaiDonHang", { orderId: item.id })}
            >
              <Text style={styles.trackText}>Theo dõi đơn</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#F4F4F4",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#A30846",
  },
  orderItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 15,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderPrice: {
    fontSize: 14,
    color: "gray",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A30846",
  },
  orderTime: {
    fontSize: 12,
    color: "green",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonOutline: {
    borderColor: "#A30846",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#A30846",
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: "#A30846",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonPrimaryText: {
    color: "white",
    fontWeight: "bold",
  },
  trackText: {
    backgroundColor: "#A30846",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  }
});

export default DonDaMua;