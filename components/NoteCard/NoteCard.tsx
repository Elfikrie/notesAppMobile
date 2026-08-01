import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NoteCardProps = {
  title: string;
  content: string;
};

export default function NoteCard({ title, content }: NoteCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,

    // Shadow iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Shadow Android
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  content: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
});