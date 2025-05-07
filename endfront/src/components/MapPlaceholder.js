import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapPlaceholder = () => {
  return (
    <View style={styles.mapPlaceholder}>
      <TouchableOpacity style={styles.marker}>
        <Ionicons name="location" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  mapPlaceholder: {
    height: 180,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    backgroundColor: "#A30846",
    padding: 10,
    borderRadius: 20,
  },
};

export default MapPlaceholder;
