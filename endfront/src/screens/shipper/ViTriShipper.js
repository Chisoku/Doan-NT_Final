import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Top from "../../components/Top";
import MapView, { Marker } from "react-native-maps";

const ViTriShipper = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Top title="Vị trí Shipper" showBackButton={true} showCartIcon={false} />

      {/* Bản đồ */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.7769, // Toạ độ mặc định
          longitude: 106.7009,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Marker vị trí shipper */}
        <Marker
          coordinate={{ latitude: 10.7769, longitude: 106.7009 }}
          title="Shipper đang ở đây"
          description="Crumble Cafe & Bake Shop"
        />
      </MapView>
    </View>
  );
};

export default ViTriShipper;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
