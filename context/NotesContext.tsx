import {createContext,ReactNode,useContext,useEffect,useState,} from "react";
import { createNote, deleteNote as deleteNoteService, getNotes, Note, updateNote as updateNoteService } from "../services/noteServices";
import { useSQLiteContext } from "expo-sqlite";

type NotesContextType = {
  notes: Note[];

  loading: boolean;

  error: string | null;

  addNote: (
    title: string,
    content: string
  ) => Promise<void>;

  updateNote: (
    id: number,
    title: string,
    content: string
  ) => Promise<void>;

  deleteNote: (
    id: number
  ) => Promise<void>;
};

const NotesContext = createContext<
  NotesContextType | undefined
>(undefined);

export function NotesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const db = useSQLiteContext();

  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  async function loadNotes() {
    try {
      setLoading(true);
      setError(null);

      const result = await getNotes(db);

      setNotes(result);
    } catch (error) {
      console.error(error);
      setError("Gagal memuat catatan.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote(
    title: string,
    content: string
  ) {
    await createNote(
    db,
    title,
    content
  );

    await loadNotes();
  }

  async function updateNote(
    id: number,
    title: string,
    content: string
  ) {
    await updateNoteService(
    db,
    id,
    title,
    content
  );

    await loadNotes();
  }

  async function deleteNote(id: number) {
    await deleteNoteService(db, id);

    await loadNotes();
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error(
      "useNotes harus digunakan di dalam NotesProvider"
    );
  }

  return context;
}