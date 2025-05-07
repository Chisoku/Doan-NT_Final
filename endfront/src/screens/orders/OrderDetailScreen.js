import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";

const OrderDetailScreen = ({ route }) => {
    const { orderId } = route.params;
    const [orderItems, setOrderItems] = useState([]);


    const formatPrice = (price) =>
        price.toLocaleString('vi-VN') + ' VND';

    const getCartTotal = () =>
        orderItems.reduce((sum, item) => sum + item.Product.price * item.quantity, 30000);
    
  
    useEffect(() => {
      const fetchOrderDetails = async () => {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data.data)) {
          setOrderItems(data.data);
        } else {
          setOrderItems([]);
        }
      };
      fetchOrderDetails();
    }, [orderId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B71359" barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết đơn hàng </Text>
        <View style={{ width: 40 }} />
      </View>

      {Array.isArray(orderItems) && orderItems.length === 0 ? (
        // Empty Cart
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('ProductDetailScreen')}
          >
            <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Cart Items */}
          <ScrollView>
            <View style={styles.cartItemsContainer}>
              {orderItems.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.checkbox}>
                    <Ionicons name="checkmark" size={18} color="white" />
                  </View>
                  <Image
                    source={{ uri: `${BASE_URL}/${item.Product.image.replace(/\\/g, '/')}` }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.Product.name}</Text>
                    <Text style={styles.itemPrice}>{formatPrice(item.Product.price)}</Text>
                    <View style={styles.quantityControls}>
                    </View>
                  </View>
    
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Checkout Footer */}
          <View style={styles.checkoutContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalPrice}>{formatPrice(getCartTotal())}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>
                Chuẩn không cần chỉnh 
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#A30846',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 20,
    marginTop: -50
  },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  emptyCartText: { fontSize: 18, fontWeight: 'bold', color: '#757575', marginVertical: 16 },
  continueShoppingButton: { backgroundColor: '#A30846', padding: 12, borderRadius: 8 },
  continueShoppingText: { color: 'white', fontWeight: 'bold' },
  cartItemsContainer: { padding: 16 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#B71359',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  itemImage: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#FFE6EE' },
  itemDetails: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 16, color: '#212121', marginBottom: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#B71359', marginBottom: 8 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: 28, height: 28, borderWidth: 1, borderColor: '#E0E0E0',
    borderRadius: 14, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  quantityButtonText: { fontSize: 16, color: '#212121' },
  quantityText: { fontSize: 16, color: '#212121', marginHorizontal: 12, minWidth: 20, textAlign: 'center' },
  deleteButton: { paddingHorizontal: 8 },
  checkoutContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
    marginBottom: -32,
    paddingBottom: 30
  },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  totalLabel: { fontSize: 16, color: '#212121' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#B71359' },
  checkoutButton: {
    backgroundColor: '#B71359', paddingVertical: 12,
    borderRadius: 10, justifyContent: 'center', alignItems: 'center'
  },
  checkoutButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default OrderDetailScreen;


