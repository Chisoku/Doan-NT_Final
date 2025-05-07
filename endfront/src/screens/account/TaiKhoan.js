import React from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Top from "../../components/Top";
import AvatarSection from "../../components/AvatarSection";
import UserInfoSection from "../../components/UserInfoSection";
import { fetchUserInfo } from "../../services/userService";

const TaiKhoan = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const userId = params?.userId || 12;
  const [user, setUser] = useState(null);


  useFocusEffect(
    React.useCallback(() => {
      const loadUserInfo = async () => {
        try {
          const userData = await fetchUserInfo(userId);
          setUser(userData);
        } catch {
          setUser(null);
        }
      };
      loadUserInfo();
    }, [userId])
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Đang tải dữ liệu người dùng...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <Top
        title="Tài khoản"
        showBackButton
        showCartIcon={false}
        onEdit={() => navigation.navigate("SuaTaiKhoan")}
      />

      {/* Avatar - Nhấn vào avatar cũng điều hướng */}
      <AvatarSection avatar={user.avatar}/>
      <UserInfoSection name={user.name} phone={user.phone} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default TaiKhoan;