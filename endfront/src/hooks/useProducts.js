// useProducts.js
import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await fetchProducts();
                setProducts(productData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { products, loading, error };
};

export default useProducts;
