// components/UserInfo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserInfo = ({ userData }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Ionicons name="location-outline" size={20} color="#B71359" />
      <Text style={styles.sectionTitle}>{userData.name} | {userData.phone}</Text>
    </View>
    <Text style={styles.addressText}>{userData.address}</Text>
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addressText: {
    color: '#757575',
    marginLeft: 28,
  },
});

export default UserInfo;
