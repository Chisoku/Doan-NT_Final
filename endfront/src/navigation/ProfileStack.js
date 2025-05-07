

import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/account/ProfileScreen";
import TaiKhoan from "../screens/account/TaiKhoan";
import EditProfileScreen from "../screens/account/SuaTaiKhoan";
import DonDaMua from "../screens/orders/DonDaMua";
import TrangThaiDonHang from "../screens/orders/TrangThaiDonHang";
import ViTriShipper from "../screens/shipper/ViTriShipper";
import DiaChi from "../screens/account/DiaChi";
import ChinhSuaDiaChi from "../screens/account/ChinhSuaDiaChi";
import DoiMatKhau from "../screens/account/DoiMatKhau";
import DoiMatKhauHoanThanh from "../screens/account/DoiMatKhauHoanThanh";
import TrungTamHoTro from "../screens/support/TrungTamHoTro";
import DangXuat from "../screens/account/DangXuat";

const Stack = createStackNavigator();

const ProfileStack = ({ setIsLoggedIn }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="TaiKhoan" component={TaiKhoan} />
            <Stack.Screen name="SuaTaiKhoan" component={EditProfileScreen} />
            <Stack.Screen name="DonDaMua" component={DonDaMua} />
            <Stack.Screen name="TrangThaiDonHang" component={TrangThaiDonHang} />
            <Stack.Screen name="ViTriShipper" component={ViTriShipper} />
            <Stack.Screen name="DiaChi" component={DiaChi} />
            <Stack.Screen name="ChinhSuaDiaChi" component={ChinhSuaDiaChi} />
            <Stack.Screen name="DoiMatKhau" component={DoiMatKhau} />
            <Stack.Screen name="DoiMatKhauHoanThanh" component={DoiMatKhauHoanThanh} />
            <Stack.Screen name="TrungTamHoTro" component={TrungTamHoTro} />
            
            {/* Truyền setIsLoggedIn vào DangXuat */}
            <Stack.Screen name="DangXuat">
                {(props) => <DangXuat {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default ProfileStack;
