// components/PaymentMethodSelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => (
  <View style={styles.section}>
    <Text style={styles.sectionHeader}>Phương thức thanh toán</Text>

    <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('cod')}>
      <View style={styles.paymentOptionLeft}>
        <View style={styles.radioButton}>
          {paymentMethod === 'cod' && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={styles.paymentOptionText}>Thanh toán khi nhận hàng</Text>
      </View>
      <Ionicons name="cash-outline" size={24} color="#757575" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod('bank')}>
      <View style={styles.paymentOptionLeft}>
        <View style={styles.radioButton}>
          {paymentMethod === 'bank' && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={styles.paymentOptionText}>Chuyển khoản</Text>
      </View>
      <Ionicons name="card-outline" size={24} color="#757575" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B71359',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#B71359',
  },
  paymentOptionText: {
    fontSize: 14,
  },
});

export default PaymentMethodSelector;
