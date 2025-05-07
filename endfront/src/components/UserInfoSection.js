import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const UserInfoSection = ({ name, phone }) => (
  <View style={styles.infoContainer}>
    <View style={styles.infoItem}>
      <Icon name="user" size={18} color="#A30846" style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>HỌ VÀ TÊN</Text>
        <Text style={styles.infoValue}>{name}</Text>
      </View>
    </View>
    <View style={styles.infoItem}>
      <Icon name="phone" size={18} color="#A30846" style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>SỐ ĐIỆN THOẠI</Text>
        <Text style={styles.infoValue}>{phone}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoIcon: { marginRight: 15 },
  infoLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#A30846",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
});

export default UserInfoSection;