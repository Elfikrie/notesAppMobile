import { SQLiteDatabase } from "expo-sqlite";

export type Note = {
  id: number;
  title: string;
  content: string;
};

export async function getNotes(
  db: SQLiteDatabase
): Promise<Note[]> {
  return await db.getAllAsync<Note>(
    "SELECT * FROM notes ORDER BY id DESC"
  );
}

export async function createNote(
  db: SQLiteDatabase,
  title: string,
  content: string
) {
  await db.runAsync(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    title,
    content
  );
}

export async function updateNote(
  db: SQLiteDatabase,
  id: number,
  title: string,
  content: string
) {
  await db.runAsync(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    title,
    content,
    id
  );
}

export async function deleteNote(
  db: SQLiteDatabase,
  id: number
) {
  await db.runAsync(
    "DELETE FROM notes WHERE id = ?",
    id
  );
}