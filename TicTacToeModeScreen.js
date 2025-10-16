// TicTacToeModeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TicTacToeModeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🎮 Choose Your Mode</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TicTacToe")} // Player vs Player
        activeOpacity={0.85}
      >
        <Ionicons name="people-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Player vs Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6A1B9A" }]}
        onPress={() => navigation.navigate("TicTacToeAI")} // Player vs AI
        activeOpacity={0.85}
      >
        <Ionicons name="hardware-chip-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Player vs AI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6D4C41" }]}
        onPress={() => navigation.goBack()} // Back to menu
        activeOpacity={0.85}
      >
        <Ionicons name="arrow-back-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 50,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#388E3C",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 14,
    elevation: 3,
    marginVertical: 15, // 🌿 this adds visible space between buttons
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
