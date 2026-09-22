import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function TextareaInput() {
  const [text, onChangeText] = useState("");

  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
      placeholder="Tulis catatan di sini..."
      placeholderTextColor="#888"
      multiline
      textAlignVertical="top"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 150,

    backgroundColor: "#fff",

    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,

    padding: 15,
    marginBottom: 10,
    fontSize: 16,

    textAlignVertical: "top",
  },
});