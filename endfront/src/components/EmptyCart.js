import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyCart = ({ onContinueShopping }) => (
  <View style={styles.container}>
    <Ionicons name="cart-outline" size={80} color="#E0E0E0" />
    <Text style={styles.text}>Giỏ hàng trống</Text>
    <TouchableOpacity style={styles.button} onPress={onContinueShopping}>
      <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { fontSize: 18, fontWeight: 'bold', color: '#757575', marginVertical: 16 },
  button: { backgroundColor: '#A30846', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});

export default EmptyCart;
