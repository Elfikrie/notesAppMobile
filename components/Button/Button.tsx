import { Pressable, Text, StyleSheet } from "react-native";

export default function Button({title}) {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});