import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import { Stack } from 'expo-router';
import { SQLiteProvider } from "expo-sqlite";
import 'react-native-reanimated';
import { NotesProvider } from '@/context/NotesContext';

import { useColorScheme } from '@/hooks/use-color-scheme';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="notes.db" onInit={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
          );
        `);
      }}>
          <NotesProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
            </Stack>
          </NotesProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
