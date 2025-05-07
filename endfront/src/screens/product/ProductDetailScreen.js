import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PurchaseModal from "../../components/PurchaseModal";
import CartScreen from "../../screens/cart/CartScreen";
import { useCart } from "../../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../config";


import Top from "../../components/Top";

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + " VND";
};
const { width, height } = Dimensions.get("window");

const ProductDetailScreen = ({ route }) => {
  const [cartCount, setCartCount] = useState(); // Số lượng sản phẩm trong giỏ hàng
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const navigation = useNavigation();

  const { flower } = route.params; // Lấy dữ liệu sản phẩm từ navigation

  //console.log("Dữ liệu sản phẩm:", flower); // Kiểm tra dữ liệu sản phẩm

  const { addToCart, getCartCount } = useCart();
//console.log(flower.id);
  const productInfo = {
    id: flower.id,
    title: flower.name,
    price: formatPrice(flower.price),
    image: `${BASE_URL}/${flower.image.replace(/\\/g, '/')}`,
    description: flower.description,
    rating: 4.5,
    reviews: 110,
  };

  const handleAddToCart = (quantity = 1) => {
    addToCart(productInfo, quantity);
    setCartModalVisible(false);
    setToastVisible(true);
  };

const [reviews, setReviews] = useState([]);
const [averageRating, setAverageRating] = useState(0);


  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <Top title="" showBackButton={true} />
      
      <ScrollView>
        {/* Hình ảnh sản phẩm */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}/${flower.image.replace(/\\/g, '/')}` }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Indicator */}
          <View style={styles.indicatorContainer}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>{flower.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(flower.price)}</Text>

          {/* Đánh giá */}
          <View style={styles.ratingContainer}>
            {[...Array(4)].map((_, index) => (
              <Ionicons key={index} name="star" size={16} color="#FBC605" />
            ))}
            <Ionicons name="star-half" size={16} color="#FBC605" />
            <Text style={styles.reviewCount}>
              {productInfo.reviews} Đánh giá
            </Text>
          </View>

          <Text style={styles.chikun}>Chi tiết sản phẩm</Text>
          {/* Mô tả */}
          <Text style={styles.description}>{flower.description}</Text>
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.s}>Đánh giá </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Reviews", { productId: flower.id })}>
            <Text style={styles.viewReviewsText}>Xem tất cả đánh giá </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>  
        {/* Footer với nút Thêm vào giỏ & Mua ngay */}
      {/* Footer */}
      <View style={styles.footer}>
        {/* Nút Thêm vào giỏ */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => setCartModalVisible(true)}
        >
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>

      </View>
            {/* Purchase Modal */}
            <PurchaseModal
        visible={purchaseModalVisible}
        onClose={() => setPurchaseModalVisible(false)}
        product={productInfo}
      />

      {/* Cart Modal */}
      <CartScreen
        visible={cartModalVisible}
        onClose={() => setCartModalVisible(false)}
        product={productInfo}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    chikun:{
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    },
  cartBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "orange",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  productImage: {
    width: width * 0.85,
    height: width * 0.6,
    borderRadius: 15,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 10,
    height: 10,
    backgroundColor: "#F05C18",
    borderRadius: 5,
    marginHorizontal: 4,
  },
  detailsContainer: {
    backgroundColor: "#F8F9FB",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    marginTop: 15,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F05C18",
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewCount: {
    marginLeft: 5,
    fontSize: 14,
    color: "#888",
  },
  description: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    //borderTopWidth: 1,
    //borderTopColor: "#ccc",
  },
  addToCartButton: {
    backgroundColor: "#A30846",
    borderWidth: 1,
    borderColor: "#A30846",
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 20,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,

  },
  buyNowButton: {
    backgroundColor: "#A30846",
    paddingVertical: 20,
    paddingHorizontal: 55,
    borderRadius: 20,
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewsContainer: {
    backgroundColor: "#F8F9FB",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    marginTop: 15,
    marginBottom: 140,
    flexDirection: "row",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  reviewCount: {
    marginLeft: 5,
    fontSize: 14,
    color: "#888",
  },
  viewReviewsText: {
    marginTop: 2,
    fontSize: 14,
    color: "#A30846",
    textDecorationLine: "underline",
    marginLeft: 150,
    
  },
  s: {
    fontSize: 17,
    fontWeight: "400",
    //marginTop: 1,
  },
});

export default ProductDetailScreen;