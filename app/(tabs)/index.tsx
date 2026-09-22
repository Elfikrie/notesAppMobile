import AddButton from "@/components/AddButton/AddButton";
import NoteCard from "@/components/NoteCard/NoteCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useNotes } from "../../context/NotesContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter(); 

  const { notes, loading, error } = useNotes();

  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <Text style={styles.subtitle}>Your personal notes</Text>

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.noteList}>
        {loading && (
          <Text>Memuat catatan...</Text>
        )}

        {error && (
          <Text>{error}</Text>
        )}

        {!loading &&
          !error &&
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              onPress={() =>
                router.push(`/note/${note.id}`)
              }
            />
          ))}
      </View>

      <AddButton
        onPress={() => {
          router.push("/add-note");
        }}
      />
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
    fontSize: 32,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 24,
  },

  noteList: {
    marginTop: 10,
  },
});
