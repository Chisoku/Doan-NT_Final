import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CartFooter = ({ total, itemCount, onCheckout }) => {
  const formatPrice = (price) =>
    price.toLocaleString('vi-VN') + ' VND';

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Tổng thanh toán</Text>
        <Text style={styles.totalPrice}>{formatPrice(total)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutButtonText}>
          Mua hàng ({itemCount})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default CartFooter;
