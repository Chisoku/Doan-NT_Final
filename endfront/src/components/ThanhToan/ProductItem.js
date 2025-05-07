// components/ProductItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BASE_URL } from '../../config';

const formatPrice = (price) => price.toLocaleString('vi-VN') + ' VND';

const ProductItem = ({ item }) => (
  <View style={styles.productItem}>
    <Image 
      source={{ uri: `${BASE_URL}/${item.Product.image.replace(/\\/g, '/')}` }}
      style={styles.productImage}
    />
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{item.Product.name}</Text>
      <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
    </View>
    <Text style={styles.productPrice}>{formatPrice(item.Product.price)}</Text>
  </View>
);

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFE6EE',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  productQuantity: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B71359',
  },
});

export default ProductItem;
