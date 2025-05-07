import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const SortOptions = ({ selectedSort, onSortChange, options }) => {
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 10,
    }}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onSortChange(option.id)}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderBottomWidth: selectedSort === option.id ? 3 : 0,
            borderBottomColor: "#A30846",
          }}
        >
          <Text style={{ fontSize: 14, color: selectedSort === option.id ? "#A30846" : "#666" }}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortOptions;
