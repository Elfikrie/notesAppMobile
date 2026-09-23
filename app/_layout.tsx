import { NotesProvider } from "@/context/NotesContext";
import { Stack } from "expo-router";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "expo-router/react-navigation";
import { SQLiteProvider } from "expo-sqlite";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

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
              options={{ headerTitle: `Assalamualaikum, ${getGreeting()}` }}
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
