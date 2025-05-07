
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from "../../config";


import UserInfo from '../../components/ThanhToan/UserInfo';
import ProductItem from '../../components/ThanhToan/ProductItem';
import PriceSummary from '../../components/ThanhToan/PriceSummary';
import PaymentMethodSelector from '../../components/ThanhToan/PaymentMethodSelector';
import BottomBar from '../../components/ThanhToan/BottomBar';

import Top from "../../components/Top";

import AsyncStorage from '@react-native-async-storage/async-storage';
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };
const CheckoutScreen = ({ route, navigation }) => {
  // Lấy thông tin từ màn hình giỏ hàng
  const { cartItems, shippingFee, totalAmount } = route.params;
  
  // Default user data - Trong ứng dụng thực tế, bạn sẽ lấy từ user state/context
  const [userData] = useState({
    name: 'Chi PU Pu',
    phone: '0376418721',
    address: 'Hà Nội, Hai Bà Trưng, Đồng Tâm'
  });
  
  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod = cash on delivery
  
// Tính tổng tiền sản phẩm
const calculateSubtotal = () => {
  return cartItems.reduce((total, item) => {
    // Lấy giá trị của sản phẩm, loại bỏ ký tự không phải số
    const price = item.Product.price;
    return total + (price * item.quantity);
  }, 0);
};

  const handleOrder = async () => {
    console.log('Đặt hàng với phương thức thanh toán:', paymentMethod);
    try {
      const token = await AsyncStorage.getItem('token');
      const orderId = await AsyncStorage.getItem('orderId');
      console.log(orderId); // Lấy; token từ AsyncStorage
      if (!token) {
        alert('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
        return;
      }

  //console.log('Token:', `${BASE_URL}/api/orders/${orderId}`); // Kiểm tra token
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_type: paymentMethod,
          status: 'paid',
          shipping_address: userData.address, // ✅ sửa lại
          total_price: totalAmount,           // ✅ sửa lại
          content_type: `Đơn hàng ${orderId}`
        })
        
      });
  
      // Kiểm tra xem phản hồi có thành công không
      if (!response.ok) {
        throw new Error('Cập nhật đơn hàng thất bại');
      }
  
      const updatedOrder = await response.json();
      console.log('Đơn hàng đã được cập nhật:', updatedOrder);
      navigation.navigate('Success', { order: updatedOrder });
  
    } catch (error) {
      console.error('Order update error:', error.message);
      alert('Đặt hàng thất bại. Vui lòng thử lại.');
    }
  };


  
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Top title="Thanh toán" showBackButton={true} showCartIcon={false} />
      
      <ScrollView style={styles.content}>
        {/* User Info */}
        <UserInfo userData={userData} />
        
        {/* Product Info */}
        <View style={{ backgroundColor: 'white', marginBottom: 10, padding: 16 }}>
          {cartItems.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </View>
        
        {/* Price Summary */}
        <PriceSummary
          subtotal={calculateSubtotal()}
          shippingFee={shippingFee}
          totalAmount={totalAmount}
        />

        
        {/* Payment Method */}
        <PaymentMethodSelector
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </ScrollView>
      {/* Bottom Bar */}
      <BottomBar totalAmount={totalAmount} onOrder={handleOrder} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: -44
  },

});

export default CheckoutScreen;