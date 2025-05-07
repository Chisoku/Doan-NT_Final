// components/PriceSummary.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' VND';

const PriceSummary = ({ subtotal, shippingFee, totalAmount }) => (
  <View style={styles.section}>
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>Tạm tính</Text>
      <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
    </View>
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
      <Text style={styles.summaryValue}>{formatPrice(shippingFee)}</Text>
    </View>
    <View style={[styles.summaryItem, styles.summaryTotal]}>
      <Text style={styles.totalLabel}>Tổng thanh toán</Text>
      <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    color: '#757575',
  },
  summaryValue: {
    fontWeight: 'bold',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#B71359',
  },
});

export default PriceSummary;
