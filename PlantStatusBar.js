// PlantStatusBar.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc, runTransaction } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

export default function PlantStatusBar({ plantId, initialValues = {} }) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user)
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>⚠️ You must be logged in to view this plant.</Text>
      </View>
    );

  const userRef = doc(db, "users", user.uid);
  const plantRef = doc(db, "users", user.uid, "plants", plantId);

  // ------------------------
  // Constants and State
  // ------------------------
  const DECAY_RATE = 0.5;
  const ON_TIME_POINTS = 10;
  const LATE_POINTS = 5;
  const TOO_EARLY_PENALTY = 5;
  const msPerDay = 24 * 60 * 60 * 1000;

  const [plantData, setPlantData] = useState({});
  const [inventory, setInventory] = useState([]);
  const scaleAnims = useRef({
    water: new Animated.Value(1),
    light: new Animated.Value(1),
    fertilizer: new Animated.Value(1),
  }).current;

  const animatePress = (type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(scaleAnims[type], { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  // ------------------------
  // Load data
  // ------------------------
  useEffect(() => {
    const fetchData = async () => {
      const plantSnap = await getDoc(plantRef);
      const userSnap = await getDoc(userRef);
      if (plantSnap.exists()) setPlantData(plantSnap.data());
      if (userSnap.exists()) setInventory(userSnap.data().inventory || []);
    };
    fetchData();
  }, []);

  // ------------------------
  // Helpers
  // ------------------------
  const getStock = (type) => {
    const name =
      type === "water" ? "Water" : type === "light" ? "Sunlight" : "Fertilizer";
    const found = inventory.find((i) => i.name === name);
    return found ? found.quantity : 0;
  };

  const updateInventory = async (type) => {
    const name =
      type === "water" ? "Water" : type === "light" ? "Sunlight" : "Fertilizer";

    const newInventory = inventory.map((i) =>
      i.name === name ? { ...i, quantity: Math.max(i.quantity - 1, 0) } : i
    );
    await setDoc(userRef, { inventory: newInventory }, { merge: true });
    setInventory(newInventory);
  };

  const getColor = (type) =>
    type === "water"
      ? "#004a94"
      : type === "light"
      ? "#e2c000"
      : "#1d9b1d";

  // ------------------------
  // Handle Care Action
  // ------------------------
  const handleCare = async (type) => {
    const stock = getStock(type);
    if (stock <= 0) {
      Alert.alert("❌ Out of stock", `You don’t have any ${type} left.`);
      return;
    }

    animatePress(type);

    try {
      await runTransaction(db, async (transaction) => {
        const plantSnap = await transaction.get(plantRef);
        const userSnap = await transaction.get(userRef);
        if (!plantSnap.exists() || !userSnap.exists()) return;

        const plant = plantSnap.data();
        const userData = userSnap.data();
        const inventory = userData.inventory || [];

        // Update inventory
        const itemName =
          type === "water" ? "Water" : type === "light" ? "Sunlight" : "Fertilizer";
        const updatedInventory = inventory.map((item) =>
          item.name === itemName
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        );

        // Update plant level
        const newLevel = Math.min((plant[`${type}Level`] || 0) + 0.1, 1);
        const newPoints = (plant.points || 0) + ON_TIME_POINTS;
        const newPlantLevel =
          newPoints >= 30 ? (plant.plantLevel || 1) + 1 : plant.plantLevel;

        transaction.update(userRef, { inventory: updatedInventory });
        transaction.update(plantRef, {
          [`${type}Level`]: newLevel,
          points: newPoints >= 30 ? 0 : newPoints,
          plantLevel: newPlantLevel,
        });
      });

      await updateInventory(type);

      Alert.alert("🌿 Care Success", `You used ${type} successfully!`);
    } catch (err) {
      console.error(err);
      Alert.alert("⚠️ Error", "Something went wrong. Try again.");
    }
  };

  // ------------------------
  // Render
  // ------------------------
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{plantData.name || "My Plant"}</Text>
      <Text style={styles.subtitle}>Level {plantData.plantLevel || 1}</Text>
      <Text style={styles.pointsText}>Plant XP: {plantData.points || 0}/30</Text>

      <View style={styles.barContainer}>
        {["water", "light", "fertilizer"].map((type) => (
          <View key={type} style={styles.barColumn}>
            <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
              <TouchableOpacity
                onPress={() => handleCare(type)}
                style={[styles.circleButton, { borderColor: getColor(type) }]}
              >
                <Ionicons
                  name={
                    type === "water"
                      ? "water-outline"
                      : type === "light"
                      ? "sunny-outline"
                      : "leaf-outline"
                  }
                  size={28}
                  color={getColor(type)}
                />
                <View style={styles.stockBadge}>
                  <Text style={styles.stockText}>{getStock(type)}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.labelText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>

            <Progress.Bar
              progress={Math.min(
                1,
                (plantData[`${type}Level`] ?? 0) / 1
              )}
              width={80}
              height={8}
              color={getColor(type)}
              borderColor="#ccc"
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", paddingVertical: 20 },
  title: { fontSize: 18, fontWeight: "bold", color: "#2E7D32" },
  subtitle: { fontSize: 16, color: "#388E3C", marginBottom: 5 },
  pointsText: { color: "#4CAF50", marginBottom: 10 },
  barContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  barColumn: { alignItems: "center" },
  circleButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fff5",
  },
  stockBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  stockText: { color: "white", fontSize: 10, fontWeight: "bold" },
  labelText: { marginTop: 8, fontSize: 12, color: "#333" },
  centered: { justifyContent: "center", alignItems: "center" },
});
