

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/main/HomeScreen";
import CategoryNavigator from "../navigation/CategoryNavigator";
import ProfileStack from "../navigation/ProfileStack";  // Dùng ProfileStack thay vì ProfileScreen
import NotificationScreen from "../screens/notifications/NotificationScreen";

const Tab = createBottomTabNavigator();

const MainTabs = ({ setIsLoggedIn }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case "Home": iconName = "home-outline"; break;
          case "CategoryTab": iconName = "receipt-outline"; break;
          case "Notifications": iconName = "notifications-outline"; break;
          case "ProfileTab": iconName = "person-outline"; break;
          default: iconName = "help-circle-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#C71585",
      tabBarInactiveTintColor: "gray",
      headerShown: false
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
    <Tab.Screen name="CategoryTab" component={CategoryNavigator} options={{ title: "Danh mục" }} />
    <Tab.Screen name="Notifications" component={NotificationScreen} options={{ title: "Thông báo" }} />
    
    {/* Truyền setIsLoggedIn vào ProfileStack */}
    <Tab.Screen name="ProfileTab" options={{title: "Tài Khoản"}}>
      {(props) => <ProfileStack {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default MainTabs;
