// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import * as Location from "expo-location"; // Import thư viện lấy vị trí
// import { useNavigation } from "@react-navigation/native";

// const AccessLocationScreen = () => {
//   const navigation = useNavigation();

//   const handleGrantAccess = async () => {
//     // Yêu cầu quyền truy cập vị trí
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status === "granted") {
//       console.log("Quyền truy cập vị trí đã được cấp!");
//       // Điều hướng đến màn hình chính hoặc tiếp theo
//       navigation.navigate("MainTabs");
//     } else {
//       console.log("Quyền truy cập vị trí bị từ chối!");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Biểu tượng vị trí */}
//       <View style={styles.iconContainer}>
//         <Image
//           source={require("../../../assets/img/Auth/location.png")} // Đường dẫn đến biểu tượng vị trí
//           style={styles.icon}
//         />
//       </View>

//       {/* Thông báo */}
//       <Text style={styles.title}>Cho phép truy cập vị trí</Text>
//       <Text style={styles.subtitle}>
//         Chúng tôi cần quyền truy cập vị trí của bạn để cung cấp dịch vụ tốt nhất.
//       </Text>

//       {/* Nút cấp quyền */}
//       <TouchableOpacity style={styles.button} onPress={handleGrantAccess}>
//         <Text style={styles.buttonText}>CẤP QUYỀN</Text>
//       </TouchableOpacity>

//       {/* Nút bỏ qua */}
//       <TouchableOpacity
//         style={[styles.button, styles.skipButton]}
//         onPress={() => navigation.navigate("MainTabs")}
//       >
//         <Text style={styles.buttonText}>    BỎ QUA    </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AccessLocationScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff", // Phông nền trắng
//     paddingHorizontal: 20,
//   },
//   iconContainer: {
//     marginBottom: 40,
//   },
//   icon: {
//     width: 250,
//     height: 250,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333", // Màu chữ đậm
//     textAlign: "center",
//     textTransform: "uppercase",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666", // Màu chữ nhạt hơn
//     textAlign: "center",
//     marginBottom: 30,
//     opacity: 0.8,
//   },
//   button: {
//     backgroundColor: "#A30846",
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 17,
//     marginBottom: 15,
//   },
//   skipButton: {
//     backgroundColor: "#666", // Màu xám cho nút bỏ qua
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     padding: 9
//   },
// });



//CHƯA DÙNG TỚI FILE NÀY , MAYBE KBH DÙNG LUÔN 