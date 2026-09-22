import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View, } from "react-native";
import { useNotes } from "../../../context/NotesContext";
import Button from "../../../components/Button/Button";
import DeleteButton from "../../../components/Button/DeleteButton";


export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();

  const { notes, deleteNote } = useNotes();

  const note = notes.find(
    (item) => item.id.toString() === id
  );

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Catatan tidak ditemukan.</Text>
      </View>
    );
  }

  function handleDelete() {
    if (!note) {
      return;
    }

    Alert.alert(
      "Hapus Catatan",
      "Apakah kamu yakin ingin menghapus catatan ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteNote(note.id);
            router.back();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {note.title}
      </Text>

      <Text style={styles.content}>
        {note.content}
      </Text>

      {/* <Pressable
        style={styles.button}
        onPress={() => router.push(`/note/${id}/edit`)}
      >
        <Text style={styles.buttonText}>
          Edit Note
        </Text>
      </Pressable> */}
      <Button title="Edit Note"  onPress={() => router.push(`/note/${id}/edit`)} />
      <DeleteButton title="Hapus Note" onPress={handleDelete} />
      {/* <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            Hapus Note
          </Text>
        </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  content: {
    fontSize: 17,
    lineHeight: 26,
  },

  button: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#222",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  deleteButton: {
  marginTop: 12,
  paddingVertical: 15,
  borderRadius: 12,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#cc0000",
},

deleteButtonText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#cc0000",
},
});