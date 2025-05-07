import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PurchaseModal from '../../components/PurchaseModal';
import CartScreen from '../../screens/cart/CartScreen';
import { useCart } from '../../context/CartContext';
import { BASE_URL } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';



const ReviewsScreen = ({ navigation, route }) => {
  const { productId } = route.params;  // Lấy productId từ route params
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all'); // Trạng thái lọc theo sao
  const { getCartCount } = useCart();
  

  // Tính điểm trung bình và tỷ lệ phần trăm đánh giá sao
  const calculateRatingStats = (reviews) => {
    const totalReviews = reviews.length;
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    reviews.forEach((review) => {
      ratingCounts[review.rating]++;
      totalRating += review.rating;
    });

    const avgRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    const ratingStats = Object.keys(ratingCounts).map((star) => {
      const percentage = totalReviews > 0 ? (ratingCounts[star] / totalReviews) * 100 : 0;
      return { stars: star, percentage: percentage };
    });

    return { avgRating, ratingStats };
  };

  const { avgRating, ratingStats } = calculateRatingStats(reviews);

  const fetchReviews = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/feedbacks/${productId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Format lại cho đúng với giao diện
      const formattedData = result.data.map(item => ({
        id: item.id,
        user: item.User?.name || "Ẩn danh",
        avatar: `https://i.pravatar.cc/150?u=${item.user_id}`, // ảnh avatar giả theo user_id
        rating: item.star,
        comment: item.content || "(hihi)",
      }));

      setReviews(formattedData);
      setFilteredReviews(formattedData);  // Cập nhật danh sách lọc theo reviews gốc

      console.log("Đánh giá:", formattedData);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error.message);
    }
  };

    // Lọc đánh giá theo số sao
    const filterReviews = (rating) => {
      setSelectedRating(rating);
      if (rating === 'all') {
        setFilteredReviews(reviews); // Hiển thị tất cả đánh giá
      } else {
        setFilteredReviews(reviews.filter(review => review.rating === Number(rating))); // Lọc theo rating
      }
    };
    

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons 
          key={i}
          name="star" 
          size={16} 
          color={i < rating ? "#FFC107" : "#E0E0E0"} 
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#B71359" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartList')}
        >
          <Ionicons name="cart-outline" size={30} color="#fff" />
          {getCartCount() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        {/* Rating Overview */}
        <View style={styles.ratingOverview}>
          <View style={styles.ratingScoreContainer}>
            <Text style={styles.ratingScoreText}>{avgRating}</Text>
            <View style={styles.starsRow}>
              {renderStars(Math.round(avgRating))}
            </View>
            <Text style={styles.reviewsCountText}>{`${reviews.length} reviews`}</Text>
          </View>
          
          <View style={styles.ratingBarsContainer}>
            {ratingStats.map((stat) => (
              <View key={stat.stars} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarNumber}>{stat.stars}</Text>
                <View style={styles.ratingBarBackground}>
                  <View style={[styles.ratingBarFill, { width: `${stat.percentage}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === 'all' && styles.filterButtonActive]} 
            onPress={() => filterReviews('all')}
          >
            <Text style={selectedRating === 'all' ? styles.filterButtonTextActive : styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === '5' && styles.filterButtonActive]} 
            onPress={() => filterReviews('5')}
          >
            <Text style={selectedRating === '5' ? styles.filterButtonTextActive : styles.filterButtonText}>5 sao</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === '4' && styles.filterButtonActive]} 
            onPress={() => filterReviews('4')}
          >
            <Text style={selectedRating === '4' ? styles.filterButtonTextActive : styles.filterButtonText}>4 sao</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === '3' && styles.filterButtonActive]} 
            onPress={() => filterReviews('3')}
          >
            <Text style={selectedRating === '3' ? styles.filterButtonTextActive : styles.filterButtonText}>3 sao</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === '2' && styles.filterButtonActive]} 
            onPress={() => filterReviews('2')}
          >
            <Text style={selectedRating === '2' ? styles.filterButtonTextActive : styles.filterButtonText}>2 sao</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, selectedRating === '1' && styles.filterButtonActive]} 
            onPress={() => filterReviews('1')}
          >
            <Text style={selectedRating === '1' ? styles.filterButtonTextActive : styles.filterButtonText}>1 sao</Text>
          </TouchableOpacity>

        </View>
        
        {/* Reviews List */}
        <View style={styles.reviewsContainer}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Image 
                    source={{ uri: review.avatar }}
                    style={styles.reviewAvatar}
                    defaultSource={require('../../../assets/images/HoaNhaiYenTu.png')} 
                  />
                  <View style={styles.reviewUser}>
                    <Text style={styles.reviewUserName}>{review.user}</Text>
                    <View style={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
              Chưa có đánh giá nào cho sản phẩm này.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
        fontSize: 18,
    fontWeight: "600",
    marginTop: -60,
  },
  header: {
    backgroundColor: "#A30846",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingOverview: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  ratingScoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  ratingScoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#212121',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  reviewsCountText: {
    fontSize: 12,
    color: '#757575',
  },
  ratingBarsContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  ratingBarNumber: {
    width: 20,
    fontSize: 12,
    color: '#757575',
  },
  ratingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: '#EEEEEE',
    borderRadius: 3,
    marginLeft: 8,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  filterButtonActive: {
    backgroundColor: '#B71359',
    borderColor: '#B71359',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#757575',
  },
  filterButtonTextActive: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  reviewsContainer: {
    padding: 16,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
  },
  reviewUser: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderTopColor: '#EEEEEE',
    paddingTop: 39,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A30846",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  addToCartText: {
    color: "#A30846",
    fontWeight: "bold",
    fontSize: 16,
    

  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#B71359',
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReviewsScreen;
