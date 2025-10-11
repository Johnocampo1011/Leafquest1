// TicTacToeModeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TicTacToeModeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Choose Game Mode</Text>

      <TouchableOpacity
        style={[styles.modeButton, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate("TicTacToeScreen")}
      >
        <Ionicons name="people-outline" size={24} color="#fff" />
        <Text style={styles.modeText}>Player vs Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeButton, { backgroundColor: "#8E44AD" }]}
        onPress={() => navigation.navigate("TicTacToeAIScreen")}
      >
        <Ionicons name="hardware-chip-outline" size={24} color="#fff" />
        <Text style={styles.modeText}>Player vs AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 40,
  },
  modeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  modeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
