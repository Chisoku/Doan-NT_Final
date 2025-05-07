import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export const handleOrder = async ({ paymentMethod, userData, totalAmount, navigation }) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const orderId = await AsyncStorage.getItem('orderId');

    if (!token) {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
      return;
    }

    const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payment_type: paymentMethod,
        status: 'paid',
        shipping_address: userData.address,
        total_price: totalAmount,
        content_type: `Đơn hàng ${orderId}`
      })
    });

    if (!response.ok) {
      throw new Error('Cập nhật đơn hàng thất bại');
    }

    const updatedOrder = await response.json();
    navigation.navigate('Success', { order: updatedOrder });

  } catch (error) {
    console.error('Order update error:', error.message);
    alert('Đặt hàng thất bại. Vui lòng thử lại.');
  }
};





