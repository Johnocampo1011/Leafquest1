// TicTacToeModeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TicTacToeModeScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🎮 Choose Mode</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TicTacToe")} // Go to Player vs Player
        activeOpacity={0.8}
      >
        <Ionicons name="people-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Player vs Player</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6A1B9A" }]}
        onPress={() => navigation.navigate("TicTacToeAI")} // Go to AI version
        activeOpacity={0.8}
      >
        <Ionicons name="hardware-chip-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Player vs AI</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#388E3C",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
