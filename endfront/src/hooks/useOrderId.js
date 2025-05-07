// useOrderId.js
import { fetchOrderId } from "../services/orderService";

const useOrderId = () => {
    const getOrderId = async () => {
        try {
            await fetchOrderId();
        } catch (error) {
            console.error("Error fetching orderId:", error.message);
        }
    };

    return { getOrderId };
};

export default useOrderId;
