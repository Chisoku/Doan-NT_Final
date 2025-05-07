// hooks/useCartActions.js
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkOrderStatus, addItemToCart } from '../services/cartService';

export const useCartActions = (product, onAddToCart) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async () => {
    const token = await AsyncStorage.getItem("token");
    const orderId = await AsyncStorage.getItem("orderId");

    if (!token || !orderId) {
      alert('Please login and create an order first.');
      return;
    }

    try {
      const status = await checkOrderStatus(orderId, token);
      if (status !== 'pending') {
        alert('Your order is not pending. Please create a new order.');
        return;
      }

      await addItemToCart(orderId, product, quantity, token);
      onAddToCart(quantity);
      setQuantity(1);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleAddToCart
  };
};
