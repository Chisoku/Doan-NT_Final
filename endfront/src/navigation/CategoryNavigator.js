import { createStackNavigator } from "@react-navigation/stack";
import CategoryScreen from "../screens/categories/CategoryScreen";
import FlowerListScreen from "../screens/categories/FlowerListScreen";

const Stack = createStackNavigator();

const CategoryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Category" component={CategoryScreen} options={{ title: "Danh mục hoa" }} />
    <Stack.Screen name="FlowerList" component={FlowerListScreen} options={{ title: "Danh sách hoa" }} />
  </Stack.Navigator>
);

export default CategoryNavigator;
