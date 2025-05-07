import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';
import ProductItem from '../../components/CartModal/ProductItem';
import QuantitySelector from '../../components/CartModal/QuantitySelector';
import AddToCartButton from '../../components/CartModal/AddToCartButton';
import { useCartActions } from '../../hooks/useCartActions';

const CartScreen = ({ visible, onClose, product, onAddToCart }) => {
  const {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleAddToCart
  } = useCartActions(product, onAddToCart);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ProductItem product={product} onClose={onClose} />
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
          <AddToCartButton onPress={handleAddToCart} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CartScreen;