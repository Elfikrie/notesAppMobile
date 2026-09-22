import { useState } from "react";
import { useNotes } from "@/context/NotesContext";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

export default function AddNoteScreen() {
  const { addNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSave() {
  if (title.trim() === "") {
    Alert.alert("Perhatian", "Judul catatan belum diisi.");
    return;
  }

  if (content.trim() === "") {
    Alert.alert("Perhatian", "Isi catatan belum diisi.");
    return;
  }

  addNote(title.trim(), content.trim());

  router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Catatan</Text>

      {/* <Text style={styles.label}>Judul</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan judul..."
        value={title}
        onChangeText={setTitle}
      /> */}

      {/* <Text style={styles.label}>Isi Catatan</Text> */}

      {/* <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Tulis catatan..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      /> */}
      <Input label="Judul" placeholder="Masukkan judul" value={title} onChangeText={setTitle}/>
      <Input label="Isi Catatan" placeholder="Tulis catatanmu..." value={content} onChangeText={setContent} multiline textAlignVertical="top" style={{height:180, backgroundColor:"#fff"}}/>

      <Button title="Simpan Catatan" onPress={handleSave} />
      {/* <Pressable
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Simpan Catatan</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  textarea: {
    height: 180,
  },

  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    // elevation: 1
    backgroundColor: "#007BFF",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});