// components/ConfirmModal.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => (
  <View style={styles.modalContainer}>
    <Text style={styles.modalTitle}>{title}</Text>
    <Text style={styles.modalText}>{message}</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Không</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
        <Text style={styles.confirmText}>Có</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#A30846" },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  cancelButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelText: { fontSize: 16, color: "#333", fontWeight: "bold" },
  confirmButton: {
    backgroundColor: "#A30846",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
});

export default ConfirmModal;