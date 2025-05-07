import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SubmitButton = ({ handleSubmit }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>LƯU</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: "#A30846",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20
    
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default SubmitButton;
