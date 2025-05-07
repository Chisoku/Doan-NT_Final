import React from "react";
import { View, Text, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Header({ search, setSearch, navigation, getCartCount }) {
  return (
    <View style={{ backgroundColor: "#A30846", padding: height * 0.03, paddingBottom: height * 0.04 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }}>
        <Text style={{ color: "#fff", fontSize: height * 0.03, fontWeight: "bold", marginTop: 30 }}>
          Hey, Chi Pu!
        </Text>
        <TouchableOpacity style={{ position: "relative", paddingTop: 30 }} onPress={() => navigation.navigate("CartList")}>
          <Ionicons name="cart-outline" size={30} color="white" />
          {getCartCount() > 0 && (
            <View style={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "orange",
              borderRadius: 10,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30
            }}>
              <Text style={{ color: "white", fontSize: 12 }}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        padding: height * 0.015,
        borderRadius: 12,
        marginTop: height * 0.02
      }}>
        <Ionicons name="search-outline" size={height * 0.03} color="gray" />
        <TextInput
          style={{ marginLeft: 10, flex: 1, fontSize: height * 0.02 }}
          placeholder="Tìm kiếm..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => {
            if (search.trim()) {
              navigation.navigate("SearchScreen", { searchQuery: search });
            }
          }}
        />
      </View>
    </View>
  );
}
