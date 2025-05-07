// hooks/useCategoryNavigation.js
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const useCategoryNavigation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const navigateToCategory = (item) => {
    navigation.navigate("FlowerList", {
      category: item.id,
      categoryName: item.name,
    });
  };

  return { navigateToCategory };
};

export default useCategoryNavigation;
