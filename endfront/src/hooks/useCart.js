// hooks/useCart.js
import { useState, useEffect } from "react";
import {
  fetchOrderItemsService,
  updateQuantityService,
  deleteOrderItemService,
} from "../services/orderService";

export const useCart = () => {
  const [orderItems, setOrderItems] = useState([]);

  const fetchOrderItems = async () => {
    try {
      const result = await fetchOrderItemsService();
      setOrderItems(result.data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách giỏ hàng:", error);
    }
  };

  const increaseQuantity = async (id) => {
    const result = await updateQuantityService(id, 1);
    if (result.ok) {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: result.data.data.quantity } : item
        )
      );
    } else {
      alert(result.data.message || "Tăng số lượng thất bại");
    }
  };

  const decreaseQuantity = async (id, qty) => {
    if (qty <= 1) return;
    const result = await updateQuantityService(id, -1);
    if (result.ok) {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: result.data.data.quantity } : item
        )
      );
    } else {
      alert(result.data.message || "Giảm số lượng thất bại");
    }
  };

  const deleteOrderItem = async (id) => {
    const result = await deleteOrderItemService(id);
    if (result.ok) {
      setOrderItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      alert(result.data.message || "Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  return {
    orderItems,
    fetchOrderItems,
    increaseQuantity,
    decreaseQuantity,
    deleteOrderItem,
  };
};
