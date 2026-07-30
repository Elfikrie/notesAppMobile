import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button/Button";
import User from "../../components/User/User";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>📝 My Notes</Text>

        <View style={styles.navMenu}>
          {menus.map((menu)=> (
            <Text key={menu} style={styles.navigation}>{menu}</Text> 
          ))}
        </View>
      </View>

      <User nama="Muhammad Fikrie" />

      <Button title="+ Tambah Catatan" />
      <Button title="Login" />
      <Button title="Register" />

    </View>
  );
}

const menus = [
  "Home",
  "Notes",
  "Profile",
  "Settings",
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  navMenu: {
    flexDirection: "row",
  },

  navigation: {
    color: "#fff",
    marginHorizontal: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    fontSize: 24,
    color: "#ddd",
    marginBottom: 30,
  },
});