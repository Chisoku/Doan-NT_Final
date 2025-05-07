// components/auth/Header.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LoginTop = ({ title, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 20,
    opacity: 0.6,
  },
});

export default LoginTop;