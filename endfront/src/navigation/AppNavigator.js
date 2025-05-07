
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import Start1 from "../screens/start/start_1";
import Start2 from "../screens/start/start_2";
import MainTabs from "./MainTabs";
import SearchScreen from "../screens/search/SearchScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";
import CartListScreen from "../screens/cart/CartListScreen";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import ReviewsScreen from "../screens/product/ReviewsScreen";
import SuccessScreen from "../screens/cart/SuccessScreen";
import DonDaMua from "../screens/orders/DonDaMua";
import DanhGiaSanPham from "../screens/orders/DanhGiaSanPham";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ProfileScreen from "../screens/account/ProfileScreen";
import OrderDetailScreen from '../screens/orders/OrderDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSeenStartScreens, setHasSeenStartScreens] = useState(false); // Trạng thái để kiểm tra xem người dùng đã xem Start1 và Start2 chưa

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenStartScreens ? (
        <>
          {/* Màn hình Start1 và Start2 */}
          <Stack.Screen name="Start1">
            {(props) => (
              <Start1
                {...props}
                onNext={() => props.navigation.navigate("Start2")}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Start2">
            {(props) => (
              <Start2
                {...props}
                onFinish={() => {
                  setHasSeenStartScreens(true); // Đánh dấu đã xem Start1 và Start2
                  props.navigation.navigate("LoginScreen"); // Điều hướng đến màn hình Login
                }}
              />
            )}
          </Stack.Screen>
        </>
      ) : isLoggedIn ? (
        <>
          {/* Màn hình chính sau khi đăng nhập */}
          <Stack.Screen name="MainTabs">
            {(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen  name="CartList" component={CartListScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          <Stack.Screen name="DonDaMua" component={DonDaMua} />
          <Stack.Screen name="DanhGiaSanPham" component={DanhGiaSanPham} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} options={{ title: "Chi tiết đơn hàng" }} />


        </>
      ) : (
        <>
          <Stack.Screen name="LoginScreen">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        </>
      )
      
      }
    </Stack.Navigator>
  );
};

export default AppNavigator;

