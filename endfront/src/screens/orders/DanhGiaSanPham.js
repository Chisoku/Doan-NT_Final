import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DanhGiaSanPham = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Nội dung đánh giá theo số sao
  const getRatingText = () => {
    switch (rating) {
      case 1:
        return "Rất tệ";
      case 2:
        return "Tệ";
      case 3:
        return "Bình thường";
      case 4:
        return "Gần tuyệt vời";
      case 5:
        return "Tuyệt vời";
      default:
        return "";
    }
  };

  // Xử lý khi gửi đánh giá
  const handleSubmitReview = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao đánh giá!");
      return;
    }
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đánh giá sản phẩm</Text>
      </View>

      {/* Chất lượng sản phẩm */}
      <Text style={styles.label}>Chất lượng sản phẩm</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color={star <= rating ? "#FFD700" : "#ccc"}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Hiển thị nội dung đánh giá */}
      {rating > 0 && <Text style={styles.ratingText}>{getRatingText()}</Text>}

      {/* Ô nhập nhận xét */}
      <Text style={styles.label}>Nhận xét:</Text>
      <TextInput
        style={styles.input}
        placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé!"
        placeholderTextColor="#999"
        multiline
        value={review}
        onChangeText={setReview}
      />

      {/* Nút gửi nhận xét */}
      <TouchableOpacity style={styles.button} onPress={handleSubmitReview}>
        <Text style={styles.buttonText}>Gửi nhận xét</Text>
      </TouchableOpacity>

      {/* Modal thông báo đánh giá thành công */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
            <Text style={styles.modalText}>Đánh giá thành công!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DanhGiaSanPham;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    paddingTop: 40,
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
  
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    color: "#A30846",
    fontWeight: "bold",
    marginTop: 5,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    height: 100,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    backgroundColor: "#A30846",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#A30846",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
