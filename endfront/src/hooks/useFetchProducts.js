// hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

export const useFetchProducts = (categoryId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return console.log("Không có token");

      const res = await fetch(`${BASE_URL}/api/products?category_id=${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
      const json = await res.json();
      setData(json.data);
    } catch (e) {
      console.error("Lỗi API:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return { data, loading, refetch: fetchData };
};
