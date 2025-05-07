
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProductItem from "../../components/ProductItem";

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + " VND";
};

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { searchQuery } = route.params || {}; 
  const [search, setSearch] = useState(searchQuery || "");
  const [filteredFlowers, setFilteredFlowers] = useState([]);
console.log("Dữ liệu sản phẩm:", filteredFlowers); // Kiểm tra dữ liệu sản phẩm
  const fetchProductsBySearch = async (searchTerm) => {
    //console.log("Fetching from URL:", `${BASE_URL}/api/products?search=${searchTerm}`);

    try {
      const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
      const response = await fetch(`${BASE_URL}/api/products?search=${searchTerm}`, {
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
      setFilteredFlowers(result.data);  // Giả sử API trả về mảng dữ liệu sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setFilteredFlowers([]);  // Xử lý lỗi bằng cách set kết quả về mảng rỗng
    }
  };

  useEffect(() => {
    if (search.trim()) {
      fetchProductsBySearch(search);
    } else {
      setFilteredFlowers([]); // Nếu không có từ khóa tìm kiếm thì trả về mảng rỗng
    }
  }, [search]);  // Mỗi khi thay đổi từ khóa tìm kiếm sẽ gọi lại hàm fetchProductsBySearch

  return (
    <View style={{ flex: 1, backgroundColor: "#FAFAFA", paddingHorizontal: width * 0.05 }}>
      {/* Thanh tìm kiếm */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        paddingVertical: height * 0.012,
        paddingHorizontal: width * 0.04,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        marginTop: height * 0.06,
        marginBottom: height * 0.02
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Ionicons name="arrow-back" size={height * 0.03} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            fontSize: height * 0.018,
            marginLeft: 10,
            color: "#333",
          }}
          placeholder="Tìm kiếm hoa..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search-outline" size={height * 0.028} color="gray" style={{ marginLeft: 10 }} />
      </View>

      <FlatList
  key={2} // ép render lại khi dùng numColumns
  data={filteredFlowers}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  columnWrapperStyle={{ justifyContent: "space-between" }}
  contentContainerStyle={{ paddingBottom: height * 0.1 }}
  renderItem={({ item }) => (
    <View style={{
      backgroundColor: "#F8F9FB",
      padding: height * 0.020,
      borderRadius: 15,
      width: (width - width * 0.14) / 2, // 2 cột cách đều nhau
      marginBottom: height * 0.02,
      alignItems: "flex-start",
      elevation: 3,
    }}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetailScreen", { flower: item })}>
        <Image
          source={{ uri: `${BASE_URL}/${item.image.replace(/\\/g, '/')}` }}
        
          onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
          style={{
            width: "100%",
            height: width * 0.35,
            borderRadius: 15,
          }}
        />

      </TouchableOpacity>
      <Text style={{
        fontSize: height * 0.016,
        fontWeight: "bold",
        marginTop: height * 0.01,
        textAlign: "left",
        color: "#333",
      }}>
        {item.name}
      </Text>
      <Text style={{ 
        color: "#F05C18",
        fontSize: height * 0.015,
        fontWeight: "600",
      }}>
        {formatPrice(item.price)}
      </Text>
    </View>
  )}
/>

    </View>
  );
}
