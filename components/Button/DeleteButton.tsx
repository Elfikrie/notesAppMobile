import { Pressable,StyleSheet, Text, } from "react-native";

type DeleteButtonProps = {
  title: string;
  onPress: () => void;
};

export default function DeleteButton({
  title,
  onPress,
}: DeleteButtonProps) {
  return (
    <Pressable
      style={styles.deleteButton}
      onPress={onPress}
    >
      <Text style={styles.deleteButtonText}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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