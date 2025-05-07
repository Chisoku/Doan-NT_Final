
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet, 
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import { BASE_URL } from "../../config";
const SuccessScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);  // Để quản lý trạng thái tải dữ liệu

  const handleContinueShopping = () => {
    navigation.navigate('DonDaMua'); // Điều hướng đến Đơn Đã Mua
  };

  const handleViewOrder = async () => {
    console.log('Đang tạo đơn hàng mới...');
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);  // Kiểm tra token
  
      if (!token) {
        throw new Error('Token không tồn tại');
      }
  
      // Gọi API POST để tạo đơn hàng mới
      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'pending',  // Thêm status là 'pending'
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tạo đơn hàng thất bại: ${errorText}`);
      }
  
      const newOrder = await response.json();
      console.log('New Order:', newOrder);
  
      // Lưu orderId và orderStatus mới vào AsyncStorage
      await AsyncStorage.setItem('orderId', newOrder.data.id.toString());
      await AsyncStorage.setItem('orderStatus', newOrder.data.status);
      
  
      // Điều hướng về màn hình chính
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert(error.message || 'Không thể tạo đơn hàng mới');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success illustration */}
        <Image
          source={require('../../../assets/images/success-illustration.png')}
          style={styles.image}
          resizeMode="contain"
        />
        
        {/* Success message */}
        <Text style={styles.title}>
          Chúc mừng bạn đã thanh toán thành công
        </Text>
        
        {/* Primary button */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.primaryButtonText}>Xem chi tiết đơn hàng</Text>
        </TouchableOpacity>
        
        {/* Secondary button */}
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleViewOrder}
          disabled={isLoading}  // Disable button khi đang tải
        >
          <Text style={styles.secondaryButtonText}>
            {isLoading ? 'Đang tải...' : 'Về trang chủ'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#B71359',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SuccessScreen;
