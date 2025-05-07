// screens/CategoryScreen.js
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import Top from "../../components/Top";
import CategoryItem from "../../components/CategoryItem";
import { fetchCategories } from "../../services/categoryService";
import useCategoryNavigation from "../../hooks/useCategoryNavigation";

const { width } = Dimensions.get("window");

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const { navigateToCategory } = useCategoryNavigation();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const renderItem = ({ item }) => (
    <CategoryItem item={item} onPress={() => navigateToCategory(item)} />
  );

  return (
    <View style={styles.container}>
      <Top title="Danh mục" />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: width * 0.01,
    paddingBottom: 20,
  },
});

export default CategoryScreen;
