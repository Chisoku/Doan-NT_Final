import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Top from "../../components/Top";

const TrungTamHoTro = ({ navigation }) => {
  const phoneNumber = "0775265951";

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleInstagram = () => {
    Linking.openURL("https://www.instagram.com/chi_th09");
  };

  const handleFacebook = () => {
    Linking.openURL("https://www.facebook.com/chichichi");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Top title="Trung tâm hỗ trợ" showBackButton={true} />

      {/* Nội dung chính */}
      <View style={styles.content}>
        <Text style={styles.description}>
          Bạn có thể liên hệ qua các kênh sau để được hỗ trợ:
        </Text>

        {/* Nút Gọi Điện */}
        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Ionicons name="call" size={24} color="#fff" />
          <Text style={styles.buttonText}>Gọi ngay: {phoneNumber}</Text>
        </TouchableOpacity>

        {/* Nút Instagram */}
        <TouchableOpacity style={[styles.button, styles.instagramButton]} onPress={handleInstagram}>
          <FontAwesome name="instagram" size={24} color="#fff" />
          <Text style={styles.buttonText}>Nhắn tin qua Instagram</Text>
        </TouchableOpacity>

        {/* Nút Facebook */}
        <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFacebook}>
          <FontAwesome name="facebook" size={24} color="#fff" />
          <Text style={styles.buttonText}>Liên hệ qua Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrungTamHoTro;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, alignItems: "center" },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#333" },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A30846",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    justifyContent: "center",
  },
  instagramButton: { backgroundColor: "#E1306C" },
  facebookButton: { backgroundColor: "#3b5998" },

  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
});
