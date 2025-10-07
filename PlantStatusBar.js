import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated, Text, Alert, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

export default function PlantStatusBar({ plantId, initialValues }) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>⚠️ You must be logged in to view this plant.</Text>
      </View>
    );
  }

  const userId = user.uid;
  const plantRef = doc(db, "users", userId, "plants", plantId);

  // === Category Info ===
  const [categoryInfo, setCategoryInfo] = useState({
    plantType: initialValues?.plantType || "Indoor",
    soilType: initialValues?.soilType || "Loamy",
    waterPH: initialValues?.waterPH || "6.5",
    fertilizerType: initialValues?.fertilizerType || "Organic",
    difficulty: initialValues?.difficulty || "Easy",
  });

  // === Care Info (new structure) ===
  const care = initialValues?.care || {
    waterFrequency: 7,
    lightFrequency: 1,
    fertilizerFrequency: 30,
    waterThreshold: 1,
    lightThreshold: 7,
    fertilizerThreshold: 1,
  };

  // === State ===
  const [waterLevel, setWaterLevel] = useState(initialValues?.waterLevel || 0.1);
  const [lightLevel, setLightLevel] = useState(initialValues?.lightLevel || 0.1);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizerLevel || 0.1);
  const [plantLevel, setPlantLevel] = useState(initialValues?.plantLevel || 1);
  const [points, setPoints] = useState(initialValues?.points || 0);

  const [waterStock, setWaterStock] = useState(initialValues?.waterStock || 10);
  const [lightStock, setLightStock] = useState(initialValues?.lightStock || 10);
  const [fertilizerStock, setFertilizerStock] = useState(initialValues?.fertilizerStock || 10);

  const [lastAction, setLastAction] = useState(initialValues?.lastAction || { water: 0, light: 0, fertilizer: 0 });
  const [cooldowns, setCooldowns] = useState({ water: 0, light: 0, fertilizer: 0 });

  // === Animations ===
  const scaleAnims = {
    water: useRef(new Animated.Value(1)).current,
    light: useRef(new Animated.Value(1)).current,
    fertilizer: useRef(new Animated.Value(1)).current,
  };

  const animatePress = (type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnims[type], { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // === Fetch Plant Data ===
  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const plantSnap = await getDoc(plantRef);
        if (plantSnap.exists()) {
          const data = plantSnap.data();

          setCategoryInfo({
            plantType: data.plantType || categoryInfo.plantType,
            soilType: data.soilType || categoryInfo.soilType,
            waterPH: data.waterPH || categoryInfo.waterPH,
            fertilizerType: data.fertilizerType || categoryInfo.fertilizerType,
            difficulty: data.difficulty || categoryInfo.difficulty,
          });

          setWaterLevel(data.waterLevel ?? 0.1);
          setLightLevel(data.lightLevel ?? 0.1);
          setFertilizerLevel(data.fertilizerLevel ?? 0.1);
          setPlantLevel(data.plantLevel ?? 1);
          setPoints(data.points ?? 0);
          setWaterStock(data.waterStock ?? 10);
          setLightStock(data.lightStock ?? 10);
          setFertilizerStock(data.fertilizerStock ?? 10);
          setLastAction(data.lastAction || { water: 0, light: 0, fertilizer: 0 });
        } else {
          await setDoc(plantRef, {
            ...categoryInfo,
            ...initialValues,
            care,
            waterLevel,
            lightLevel,
            fertilizerLevel,
            plantLevel,
            points,
            waterStock,
            lightStock,
            fertilizerStock,
            lastAction,
          });
        }
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlantData();
  }, [plantId]);

  // === Cooldown updater ===
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newCooldowns = { ...cooldowns };

      const freq = {
        water: care.waterFrequency,
        light: care.lightFrequency,
        fertilizer: care.fertilizerFrequency,
      };

      Object.keys(freq).forEach((type) => {
        const lastTime = lastAction[type] || 0;
        const requiredMs = freq[type] * 24 * 60 * 60 * 1000;
        const msLeft = Math.max(0, requiredMs - (now - lastTime));
        newCooldowns[type] = Math.ceil(msLeft / 1000);
      });

      setCooldowns(newCooldowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastAction]);

  // === Save Data ===
  const savePlantData = async (updatedData = {}) => {
    try {
      await setDoc(plantRef, { ...updatedData }, { merge: true });
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  };

  // === Reward ===
  const reward = () => {
    setPoints((prev) => {
      const newPoints = prev + 10;
      if (newPoints >= 30) {
        const newLevel = plantLevel + 1;
        setPlantLevel(newLevel);
        setWaterLevel(0);
        setLightLevel(0);
        setFertilizerLevel(0);

        savePlantData({ plantLevel: newLevel, points: 0, waterLevel: 0, lightLevel: 0, fertilizerLevel: 0 });
        return 0;
      } else {
        savePlantData({ points: newPoints });
        return newPoints;
      }
    });
  };

  // === Check frequency & thresholds ===
  const canUseResource = (type, currentLevel) => {
    if (cooldowns[type] > 0) {
      Alert.alert("⏳ Cooldown active", `Wait ${formatTime(cooldowns[type])} before using ${type}.`);
      return false;
    }

    const thresholds = {
      water: care.waterThreshold,
      light: care.lightThreshold,
      fertilizer: care.fertilizerThreshold,
    };

    if (currentLevel >= thresholds[type]) {
      Alert.alert("⚠️ Limit reached!", `${type} has reached its safe threshold.`);
      return false;
    }

    return true;
  };

  // === Increase Resource ===
  const increase = (type) => {
    const stockMap = {
      water: [waterStock, setWaterStock],
      light: [lightStock, setLightStock],
      fertilizer: [fertilizerStock, setFertilizerStock],
    };

    const [stock, setStock] = stockMap[type];
    if (stock <= 0) return;

    const levelMap = {
      water: [waterLevel, setWaterLevel],
      light: [lightLevel, setLightLevel],
      fertilizer: [fertilizerLevel, setFertilizerLevel],
    };

    const [level, setLevel] = levelMap[type];
    if (!canUseResource(type, level)) return;

    animatePress(type);
    const newVal = Math.min(level + 0.1, care[`${type}Threshold`]);
    setLevel(newVal);
    setStock(stock - 1);

    const updatedLastAction = { ...lastAction, [type]: Date.now() };
    setLastAction(updatedLastAction);

    savePlantData({
      [`${type}Level`]: newVal,
      [`${type}Stock`]: stock - 1,
      lastAction: updatedLastAction,
    });

    if (newVal >= care[`${type}Threshold`]) reward();
  };

  // === Utility ===
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  const getColor = (type) =>
    type === "water" ? "#004a94ff" : type === "light" ? "#e2c000ff" : "#1d9b1dff";

  const getStock = (type) =>
    type === "water" ? waterStock : type === "light" ? lightStock : fertilizerStock;

  // === Bar UI ===
  const bar = (icon, value, type, label) => {
    const color = getColor(type);
    const stock = getStock(type);
    const isDisabled = stock <= 0;

    return (
      <View key={type} style={{ alignItems: "center" }}>
        <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
          <TouchableOpacity
            onPress={() => increase(type)}
            disabled={isDisabled || cooldowns[type] > 0}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: color,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${color}20`,
              opacity: isDisabled || cooldowns[type] > 0 ? 0.4 : 1,
            }}
          >
            <Ionicons name={icon} size={24} color={color} />
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                backgroundColor: "red",
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}
            >
              <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{stock}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Text style={{ fontSize: 12, marginTop: 4 }}>{label}</Text>
        {cooldowns[type] > 0 && <Text style={{ fontSize: 10, color: "gray" }}>⏳ {formatTime(cooldowns[type])}</Text>}
        <Progress.Bar progress={value} width={70} height={8} color={color} borderColor="#ccc" style={{ marginTop: 6 }} animated />
      </View>
    );
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 30 }}>
      {/* Plant Level & Points */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Plant Level: {plantLevel}</Text>
        <Text style={{ color: "green" }}>Points: {points}/30</Text>
        {points === 0 && <Text style={{ color: "#4CAF50", fontStyle: "italic" }}>🌱 Leveled up!</Text>}
      </View>

      {/* Resource Bars */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
        {bar("water", waterLevel, "water", "Water")}
        {bar("sunny", lightLevel, "light", "Sunlight")}
        {bar("leaf", fertilizerLevel, "fertilizer", "Fertilizer")}
      </View>

      {/* Category Info */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryHeader}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconBox}>
              <Ionicons name="leaf" size={40} color="#27AE60" />
              <Text style={styles.iconLabel}>Type</Text>
              <Text style={styles.iconValue}>{categoryInfo.plantType}</Text>
            </View>

            <View style={styles.iconBox}>
              <Ionicons name="flower" size={40} color="#9B59B6" />
              <Text style={styles.iconLabel}>Soil</Text>
              <Text style={styles.iconValue}>{categoryInfo.soilType}</Text>
            </View>

            <View style={styles.iconBox}>
              <Ionicons name="water" size={40} color="#3498DB" />
              <Text style={styles.iconLabel}>Water pH</Text>
              <Text style={styles.iconValue}>{categoryInfo.waterPH}</Text>
            </View>

            <View style={styles.iconBox}>
              <Ionicons name="nutrition" size={40} color="#E67E22" />
              <Text style={styles.iconLabel}>Fertilizer</Text>
              <Text style={styles.iconValue}>{categoryInfo.fertilizerType}</Text>
            </View>

            <View style={styles.iconBox}>
              <Ionicons name="barbell" size={40} color="#C0392B" />
              <Text style={styles.iconLabel}>Difficulty</Text>
              <Text style={styles.iconValue}>{categoryInfo.difficulty}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginTop: 16,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388E3C",
    marginBottom: 16,
    textAlign: "center",
  },
  iconBox: {
    alignItems: "center",
    marginRight: 24,
    width: 60,
  },
  iconLabel: {
    marginTop: 9,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  iconValue: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 2,
  },
});
