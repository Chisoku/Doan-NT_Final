// services/cartService.js
import { BASE_URL } from '../config';

export const checkOrderStatus = async (orderId, token) => {
  const response = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  return result?.data?.status || 'pending';
};

export const addItemToCart = async (orderId, product, quantity, token) => {
  const numericPrice = parseFloat(product.price.toString().replace(/[^\d]/g, ''));
  const cartItem = {
    order_id: parseInt(orderId),
    product_id: product.id,
    quantity,
    price: numericPrice,
  };

  const response = await fetch(`${BASE_URL}/api/orderitems`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cartItem)
  });

  if (!response.ok) throw new Error('Failed to add to cart');
};
