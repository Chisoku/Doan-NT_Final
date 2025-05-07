// components/AddressInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddressInput = ({ value, onChangeText }) => (
  <View style={styles.formContainer}>
    <Text style={styles.label}>ĐỊA CHỈ</Text>
    <View style={styles.inputRow}>
      <Ionicons name="location-outline" size={18} color="#A30846" />
      <TextInput
        style={styles.inputFull}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  formContainer: { padding: 20 },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputFull: {
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    flex: 1,
  },
});

export default AddressInput;