import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// Provider cho giỏ hàng
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.title || !product.price) return;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.title === product.title);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Hàm xoá sản phẩm khỏi giỏ hàng
  const removeFromCart = (productTitle) => {
    setCartItems(prevItems => prevItems.filter(item => item.title !== productTitle));
  };

  

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productTitle, quantity) => {
    setCartItems(prevItems => {
      if (quantity <= 0) return prevItems.filter(item => item.title !== productTitle);
      
      return prevItems.map(item => 
        item.title === productTitle ? { ...item, quantity } : item
      );
    });
  };

  // Tính tổng tiền giỏ hàng
  const getCartTotal = () => {
    return cartItems.length
      ? cartItems.reduce((total, item) => {
          const price = parseFloat(item.price?.toString().replace(/[^\d]/g, '')) || 0;
          return total + (price * item.quantity);
        }, 0)
      : 0;
  };

  const getCartCount = () => {
    return Array.isArray(cartItems) ? cartItems.length : 0;
  };
  

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng CartContext
export const useCart = () => {
  return useContext(CartContext);
};