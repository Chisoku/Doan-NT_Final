export const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };
  
export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
        const price = item.Product.price;
        return total + (price * item.quantity);
    }, 0);
};
  