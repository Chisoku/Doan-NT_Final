import React, { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text, StyleSheet } from "react-native";
import LoginTop from "../../components/auth/LoginTop";
import LoginForm from "../../components/auth/LoginForm";
import NavigationLinks from "../../components/auth/NavigationLinks";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";
import { handleLogin } from "../../services/authService";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ImageBackground
      source={require("../../../assets/img/Auth/log.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <LoginTop
          title="Đăng nhập"
          subtitle="Hãy đăng nhập bằng tài khoản của bạn"
        />
        <View style={styles.formContainer}>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />
          <NavigationLinks />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLogin(email, password, setIsLoggedIn, navigation)}
          >
            <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Hoặc</Text>
          <SocialLoginButtons />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  button: {
    backgroundColor: "#A30846",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 17,
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 9,
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#333",
    paddingTop: 35,
    paddingBottom: 45,
  },
});

export default LoginScreen;