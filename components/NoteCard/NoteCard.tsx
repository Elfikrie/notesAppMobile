import { Pressable, StyleSheet, Text } from "react-native";

type NoteCardProps = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  onPress: () => void;
};

export default function NoteCard({
  title,
  content,
  created_at,
  onPress,
}: NoteCardProps) {

function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
  return (

    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}{'\n'}<Text style={styles.date}>
          {formatDate(created_at)}
      </Text></Text>
      

      <Text
        style={styles.content}
        numberOfLines={2}
      >
        {content}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    marginTop: 0,
    color: "#aaa"
  },
});