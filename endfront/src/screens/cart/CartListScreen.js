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

import CartItem from "../../components/CartItem";
import EmptyCart from "../../components/EmptyCart";
import CartFooter from "../../components/CartFooter";


import Top from "../../components/Top";

const CartListScreen = ({ navigation }) => {
  const [orderItems, setOrderItems] = useState([]);

  // Fetch order items
  const fetchOrderItems = async () => {
    try {
      const orderId = await AsyncStorage.getItem("orderId");
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOrderItems(data.data || []);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  // Update quantity
  const updateItemQuantity = async (orderItemId, quantityChange) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }
      const response = await fetch(`${BASE_URL}/api/orderitems/${orderItemId}/chikun`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantityChange }),
      });
      const data = await response.json();
      if (response.ok) {
        setOrderItems(prev =>
          prev.map(item =>
            item.id === orderItemId
              ? { ...item, quantity: data.data.quantity }
              : item
          )
        );
      } else {
        alert(data.message || "Cập nhật số lượng thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      alert("Đã xảy ra lỗi khi cập nhật số lượng");
    }
  };

  // Delete order item
  const deleteOrderItem = async (orderItemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }
      const response = await fetch(`${BASE_URL}/api/orderitems/${orderItemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setOrderItems(prev => prev.filter(item => item.id !== orderItemId));
      } else {
        alert(data.message || "Xóa thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi xóa order item:", error);
      alert("Đã xảy ra lỗi khi xóa");
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  const handleIncreaseQuantity = (id) => updateItemQuantity(id, 1);
  const handleDecreaseQuantity = (id, qty) => {
    if (qty > 1) updateItemQuantity(id, -1);
  };

  const getCartTotal = () =>
    orderItems.reduce((sum, item) => sum + item.Product.price * item.quantity, 0);

  const formatPrice = (price) =>
    price.toLocaleString('vi-VN') + ' VND';

  const handleCheckout = () => {
    const shippingFee = 30000;
    navigation.navigate('Checkout', {
      cartItems: orderItems,
      shippingFee,
      totalAmount: getCartTotal() + shippingFee
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B71359" barStyle="light-content" />
      {/* Header */}
      <Top title="Giỏ hàng" showBackButton={true} />

      {orderItems.length === 0 ? (
        // Empty Cart
        <EmptyCart onContinueShopping={() => navigation.navigate("ProductDetailScreen")} />
      ) : (
        <>
        {/* Cart Items */}
        <ScrollView>
          <View style={styles.cartItemsContainer}>
            {orderItems.map(item => (
                <CartItem
                  item={item}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onDelete={deleteOrderItem}
                />
            ))}
          </View>
        </ScrollView>

        {/* Checkout Footer */}
        <CartFooter
          total={getCartTotal()}
          itemCount={orderItems.reduce((t, i) => t + i.quantity, 0)}
          onCheckout={handleCheckout}
        />
      </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' , marginTop: -44, },
});

export default CartListScreen;
