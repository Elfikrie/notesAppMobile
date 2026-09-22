import { Pressable, StyleSheet, Text } from "react-native";

type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({
  onPress,
}: AddButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",

    elevation: 1,
    backgroundColor: "#007AFF",
  },

  text: {
    fontSize: 32,
    fontWeight: "400",
    color: "#fff",
  },
});