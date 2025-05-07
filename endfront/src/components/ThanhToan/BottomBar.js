// components/BottomBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' VND';

const BottomBar = ({ totalAmount, onOrder }) => (
  <View style={styles.bottomBar}>
    <View style={styles.totalPriceContainer}>
      <Text style={styles.totalPriceLabel}>Tổng thanh toán</Text>
      <Text style={styles.totalPriceValue}>{formatPrice(totalAmount)}</Text>
    </View>
    <TouchableOpacity style={styles.orderButton} onPress={onOrder}>
      <Text style={styles.orderButtonText}>Đặt hàng</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 17,
    paddingBottom: 30,
    marginBottom: -30,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 20
  },
  totalPriceContainer: {
    flex: 1,
  },
  totalPriceLabel: {
    fontSize: 12,
    color: '#757575',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B71359',
  },
  orderButton: {
    backgroundColor: '#B71359',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BottomBar;
