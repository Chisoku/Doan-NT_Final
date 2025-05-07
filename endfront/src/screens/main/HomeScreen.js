import { View, FlatList, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext"; 

// components
import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";
import Banner from "../../components/Banner";

// hooks
import useProducts from "../../hooks/useProducts"; 
import useOrderId from "../../hooks/useOrderId";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
    const navigation = useNavigation();
    const { getCartCount } = useCart();  
    const [search, setSearch] = useState("");
    
    const { products } = useProducts();
    const { getOrderId } = useOrderId();

    useEffect(() => {
        getOrderId();
    }, [getOrderId]);

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header search={search} setSearch={setSearch} navigation={navigation} getCartCount={getCartCount} />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: width * 0.04 }}
                ListHeaderComponent={<Banner />}
                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
            />
        </View>
    );
}
