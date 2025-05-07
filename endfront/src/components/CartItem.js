import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from "../config";

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  const formatPrice = (price) =>
    price.toLocaleString('vi-VN') + ' VND';

  return (
    <View style={styles.cartItem}>
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
          <TouchableOpacity style={styles.quantityButton} onPress={() => onDecrease(item.id, item.quantity)}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => onIncrease(item.id)}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#A30846" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row', backgroundColor: 'white', borderRadius: 8,
    padding: 12, marginBottom: 10, alignItems: 'center', elevation: 2
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#B71359',
    justifyContent: 'center', alignItems: 'center', marginRight: 8
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
  deleteButton: { paddingHorizontal: 8 }
});

export default CartItem;
