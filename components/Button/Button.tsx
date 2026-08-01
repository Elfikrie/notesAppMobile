// import { Link } from "@/.expo/types/router";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ title, link }) {
  return (
    <Link href={link} asChild>
      <Pressable style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginRight:10
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
