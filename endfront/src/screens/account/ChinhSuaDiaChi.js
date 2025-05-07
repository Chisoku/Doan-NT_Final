import React from "react";
import { View, StyleSheet } from "react-native";
import Top from "../../components/Top";
import MapPlaceholder from "../../components/MapPlaceholder";
import SubmitButton from "../../components/SubmitButton";
import AddressInput from "../../components/AddressInput";
import useUserAddress from "../../hooks/useUserAddress";
import { updateUserAddress } from "../../services/addressService";

const ChinhSuaDiaChi = ({ navigation }) => {
  const { diaChi, setDiaChi } = useUserAddress();

  const handleSubmit = async () => {
    try {
      await updateUserAddress(12, diaChi);
      alert("Cập nhật địa chỉ thành công!");
      navigation.goBack();
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      <Top title="Chỉnh sửa địa chỉ" showBackButton />
      <MapPlaceholder />
      <AddressInput value={diaChi} onChangeText={setDiaChi} />
      <SubmitButton handleSubmit={handleSubmit} />
    </View>
  );
};

export default ChinhSuaDiaChi;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});