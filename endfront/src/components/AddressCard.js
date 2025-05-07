// components/AddressCard.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddressCard = ({ address, onEdit }) => (
  <View style={styles.addressContainer}>
    <Ionicons name="home-outline" size={24} color="#A30846" />
    <View style={styles.addressText}>
      <Text style={styles.addressTitle}>NHÀ BẠN</Text>
      <Text style={styles.addressDetail}>{address}</Text>
    </View>
    <TouchableOpacity onPress={onEdit}>
      <Ionicons name="create-outline" size={20} color="#A30846" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  addressText: { flex: 1, marginLeft: 10 },
  addressTitle: { fontWeight: "bold", fontSize: 16 },
  addressDetail: { color: "#666", fontSize: 14, marginTop: 4 },
});

export default AddressCard;