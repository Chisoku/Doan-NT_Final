import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import ProfileHeader from "../../components/ProfileHeader";
import MenuList from "../../components/MenuList";
import { fetchUserInfo } from "../../services/userService";

const ProfileScreen = () => {
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
        <Text>Đang tải thông tin người dùng...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader user={user} />
      <MenuList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F4F4" },
});

export default ProfileScreen;