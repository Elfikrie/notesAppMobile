import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNotes } from "../../../context/NotesContext";
import Button from "../../../components/Button/Button";

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();

  const { notes, updateNote } = useNotes();

  const note = notes.find(
    (item) => item.id.toString() === id
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  function handleUpdate() {
    if (!note) {
      return;
    }

    if (title.trim() === "") {
      Alert.alert(
        "Perhatian",
        "Judul catatan belum diisi."
      );
      return;
    }

    if (content.trim() === "") {
      Alert.alert(
        "Perhatian",
        "Isi catatan belum diisi."
      );
      return;
    }

    updateNote(
      note.id,
      title.trim(),
      content.trim()
    );

    router.back();
  }

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Catatan tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Edit Catatan
      </Text>

      <Text style={styles.label}>
        Judul
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul..."
      />

      <Text style={styles.label}>
        Isi Catatan
      </Text>

      <TextInput
        style={[styles.input, styles.textarea]}
        value={content}
        onChangeText={setContent}
        placeholder="Tulis catatan..."
        multiline
        textAlignVertical="top"
      />

      {/* <Pressable
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>
          Simpan Perubahan
        </Text>
      </Pressable> */}
      <Button title="Simpan Perubahan" onPress={handleUpdate} />
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
    backgroundColor: "#222",
    elevation: 3,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});