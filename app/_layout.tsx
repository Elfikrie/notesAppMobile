import { NotesProvider } from "@/context/NotesContext";
import { Stack } from "expo-router";
// import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "expo-router/react-navigation";
import { SQLiteProvider } from "expo-sqlite";
import "react-native-reanimated";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";
// import { ScrollView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Fungsi untuk menentukan ucapan berdasarkan jam
  const getGreeting = () => {
    const hours = new Date().getHours();

    if (hours >= 3 && hours < 11) {
      return "Selamat Pagi";
    } else if (hours >= 11 && hours < 15) {
      return "Selamat Siang";
    } else if (hours >= 15 && hours < 18) {
      return "Selamat Sore";
    } else {
      return "Selamat Malam";
    }
  };

  const getGreetingColor = () => {
  const hours = new Date().getHours();
    if (hours >= 3 && hours < 11) {
      return "#FFD166"; // pagi
    } else if (hours >= 11 && hours < 15) {
      return "#4D96FF"; // siang
    } else if (hours >= 15 && hours < 18) {
      return "#FF9F45"; // sore
    } else {
      return "#34495E"; // malam
    }
  };

  return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SQLiteProvider
          databaseName="notes.db"
          onInit={async (db) => {
            await db.execAsync(`
            CREATE TABLE IF NOT EXISTS notes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              created_at TEXT
            );
          `);
            const columns = await db.getAllAsync<{
              name: string;
            }>("PRAGMA table_info(notes)");

            const hasCreatedAt = columns.some(
              (column) => column.name === "created_at",
            );

            if (!hasCreatedAt) {
              await db.execAsync("ALTER TABLE notes ADD COLUMN created_at TEXT");
            }

            await db.runAsync(
              "UPDATE notes SET created_at = ? WHERE created_at IS NULL",
              new Date().toISOString(),
            );
          }}
        >
          <NotesProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerTitle: `Assalamualaikum, ${getGreeting()}`, headerStyle: {backgroundColor: getGreetingColor()}, headerTitleStyle: {color: "#FFFFFF",fontWeight: "700",}, headerTintColor: "#FFFFFF", }} 
              />
              <Stack.Screen
                name="note/[id]/index"
                options={{ title: "Detail Catatan" }}
              />
            </Stack>
          </NotesProvider>
        </SQLiteProvider>
      </ThemeProvider>
  );
}