import { Pressable, Text, StyleSheet } from "react-native";

export default function User({nama}) {
  return (
      <Text style={styles.text}>Selamat datang {nama} di Notes mu</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
});