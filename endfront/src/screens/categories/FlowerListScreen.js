import React, { useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ProductItem from "../../components/ProductItem";
import SortOptions from "../../components/SortOptions";
import Top from "../../components/Top";
import { sortProducts } from "../../utils/sortHelpers";


const SORT_OPTIONS = [
  { id: "relevant", label: "Liên quan" },
  { id: "newest", label: "Mới nhất" },
  { id: "price", label: "Giá" },
  { id: "rating", label: "Sao" },
];

const FlowerListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, categoryName } = route.params;
  const { data: flowers, refetch } = useFetchProducts(category);
  const [displayedFlowers, setDisplayedFlowers] = useState([]);
  const [selectedSort, setSelectedSort] = useState("relevant");

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
    setDisplayedFlowers(flowers);
  }, [flowers]);

  const handleSort = (type) => {
    setSelectedSort(type);
    if (type === "relevant") {
      refetch();
    } else {
      const sorted = sortProducts(flowers, type);
      setDisplayedFlowers(sorted);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Top title={categoryName} showBackButton={true} />
      <SortOptions selectedSort={selectedSort} onSortChange={handleSort} options={SORT_OPTIONS} />
      <FlatList
        data={displayedFlowers}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
        renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
      />
    </View>
  );
};

export default FlowerListScreen;
