import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Animated, Text, Alert, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // your Firebase setup file
import { getAuth } from "firebase/auth"; // ✅ import auth

export default function PlantStatusBar({ plantId, initialValues }) {

  const auth = getAuth();
  const user = auth.currentUser; // ✅ get signed-in user

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>⚠️ You must be logged in to view this plant.</Text>
      </View>
    );
  }

  const userId = user.uid; // ✅ each user has their own plants
 const plantRef = doc(db, "users", userId, "plants", plantId); // ✅ point to user's plants


  // === Category Info (static or from Firestore) ===
  const [categoryInfo, setCategoryInfo] = useState({
    plantType: initialValues?.plantType || "Indoor",
    soilType: initialValues?.soilType || "Loamy",
    waterPH: initialValues?.waterPH || "6.5",
    fertilizerType: initialValues?.fertilizerType || "Organic",
    difficulty: initialValues?.difficulty || "Easy",
  });

  // === Category UI ===
  const categoryItem = (icon, label, value) => (
    <View style={{ alignItems: "center", flex: 1, margin: 5 }}>
      <Ionicons name={icon} size={22} color="#4CAF50" />
      <Text style={{ fontSize: 12, fontWeight: "600", marginTop: 4 }}>{label}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>{value}</Text>
    </View>
  );

  // === Default rules per plant ===
const thresholds = {
  water: initialValues?.dailyThreshold?.water ?? initialValues?.waterThreshold ?? 1,
  light: initialValues?.dailyThreshold?.light ?? initialValues?.lightThreshold ?? 1,
  fertilizer: initialValues?.dailyThreshold?.fertilizer ?? initialValues?.fertilizerThreshold ?? 1,
};

// === Frequencies (days between actions) ===
const frequency = {
  water: initialValues?.waterFrequency ?? 1,
  light: initialValues?.lightFrequency ?? 1,
  fertilizer: initialValues?.fertilizerFrequency ?? 1,
};

  // === States ===
  const [waterLevel, setWaterLevel] = useState(initialValues?.water || 0.3);
  const [lightLevel, setLightLevel] = useState(initialValues?.light || 0.5);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizer || 0.2);
  const [plantLevel, setPlantLevel] = useState(1);
  const [points, setPoints] = useState(0);

    // Weekly requirements & progress
  const [weeklyNeeds, setWeeklyNeeds] = useState({
    water: initialValues?.weeklyNeeds?.water ?? 3,      // 2–3x a week
    light: initialValues?.weeklyNeeds?.light ?? 7,      // daily
    fertilizer: initialValues?.weeklyNeeds?.fertilizer ?? 1, // once a week
  });

  const [weeklyProgress, setWeeklyProgress] = useState({
    water: initialValues?.weeklyProgress?.water ?? 0,
    light: initialValues?.weeklyProgress?.light ?? 0,
    fertilizer: initialValues?.weeklyProgress?.fertilizer ?? 0,
  });

// Add this function inside your PlantStatusBar component
const resetWaterCooldown = async () => {
  if (!userId) {
    console.error("❌ No user logged in!");
    return;
  }

  try {
    const plantRef = doc(db, "users", userId, "plants", plantId);

    // Reset lastAction for water
    setLastAction((prev) => ({
      ...prev,
      water: 0,
    }));

    // Reset cooldown locally
    setCooldowns((prev) => ({
      ...prev,
      water: 0,
    }));

    // Update Firestore
    await setDoc(
      plantRef,
      {
        lastAction: {
          ...lastAction,
          water: 0,
        },
      },
      { merge: true }
    );

    Alert.alert("✅ Water cooldown reset!", "You can water your plant immediately.");
  } catch (err) {
    console.error("❌ Failed to reset water cooldown:", err);
    Alert.alert("Error", "Could not reset cooldown.");
  }
};

  // Stocks
  const [waterStock, setWaterStock] = useState(initialValues?.waterStock ?? 5);
  const [lightStock, setLightStock] = useState(initialValues?.lightStock ?? 5);
  const [fertilizerStock, setFertilizerStock] = useState(initialValues?.fertilizerStock ?? 5);

  // Last action timestamps
  const [lastAction, setLastAction] = useState({
    water: 0,
    light: 0,
    fertilizer: 0,
  });

  // Cooldown timers (seconds remaining)
  const [cooldowns, setCooldowns] = useState({
    water: 0,
    light: 0,
    fertilizer: 0,
  });

  // Animations
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

  // === Fetch plant data from Firestore ===
  useEffect(() => {
  const fetchPlantData = async () => {
    try {
      const plantSnap = await getDoc(plantRef);
      if (plantSnap.exists()) {
        const data = plantSnap.data();

        // === Update category info from Firestore ===
        setCategoryInfo({
          plantType: data.plantType || initialValues?.plantType || "Indoor",
          soilType: data.soilType || initialValues?.soilType || "Loamy",
          waterPH: data.waterPH || initialValues?.waterPH || "6.5",
          fertilizerType: data.fertilizerType || initialValues?.fertilizerType || "Organic",
          difficulty: data.difficulty || initialValues?.difficulty || "Easy",
        });

        // === Update other plant data as before ===
        setWaterLevel(data.waterLevel || 0.3);
        setLightLevel(data.lightLevel || 0.5);
        setFertilizerLevel(data.fertilizerLevel || 0.2);
        setPlantLevel(data.plantLevel || 1);
        setPoints(data.points || 0);
        setWaterStock(data.waterStock ?? 5);
        setLightStock(data.lightStock ?? 5);
        setFertilizerStock(data.fertilizerStock ?? 5);
        setLastAction(data.lastAction || { water: 0, light: 0, fertilizer: 0 });
      } else {
        // Initialize Firestore with defaults if document doesn't exist
        await setDoc(plantRef, {
          plantType: categoryInfo.plantType,
          soilType: categoryInfo.soilType,
          waterPH: categoryInfo.waterPH,
          fertilizerType: categoryInfo.fertilizerType,
          difficulty: categoryInfo.difficulty,
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

      Object.keys(frequency).forEach((type) => {
        const lastTime = lastAction[type] || 0;
        const requiredMs = frequency[type] * 24 * 60 * 60 * 1000;
        const msLeft = Math.max(0, requiredMs - (now - lastTime));
        newCooldowns[type] = Math.ceil(msLeft / 1000); // in seconds
      });

      setCooldowns(newCooldowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastAction]);

  // === Save to Firestore ===
  const savePlantData = async (updatedData = {}) => {
    try {
      const plantRef = doc(db, "users", userId, "plants", plantId);
      await setDoc(
        plantRef,
        {
          waterLevel,
          lightLevel,
          fertilizerLevel,
          plantLevel,
          points,
          waterStock,
          lightStock,
          fertilizerStock,
          lastAction,
          ...updatedData,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  };

  // === Reward system ===
  const reward = () => {
    setPoints((prev) => {
      const newPoints = prev + 10;
      if (newPoints >= 30) {
        const newLevel = plantLevel + 1;
        setPlantLevel(newLevel);
        setWaterLevel(0);
        setLightLevel(0);
        setFertilizerLevel(0);

        savePlantData({
          plantLevel: newLevel,
          points: 0,
          waterLevel: 0,
          lightLevel: 0,
          fertilizerLevel: 0,
        });

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

    if (currentLevel >= thresholds[type]) {
      Alert.alert("⚠️ Limit reached!", `${type} has reached its safe threshold.`);
      return false;
    }

    return true;
  };

   // === Update weekly progress (respects daily threshold) ===
  const updateWeeklyProgress = (type) => {
    const today = new Date().toDateString();

    // Prevent multiple actions in one day
    if (!lastAction[type]) lastAction[type] = "";
    if (lastAction[type] === today) {
      Alert.alert("⚠️ Limit", `You already gave ${type} today!`);
      return false;
    }

    // Prevent overfilling weekly requirement
    if (weeklyProgress[type] >= weeklyNeeds[type]) {
      Alert.alert("✅ Done", `${type} is already complete for this week!`);
      return false;
    }

    // Update progress
    setWeeklyProgress((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    // Mark today's action
    setLastAction((prev) => ({
      ...prev,
      [type]: today,
    }));

    // Save to Firestore
    savePlantData({
      weeklyProgress: {
        ...weeklyProgress,
        [type]: weeklyProgress[type] + 1,
      },
      lastAction: {
        ...lastAction,
        [type]: today,
      },
    });

    return true;
  };

  // === Increase resource ===
  const increase = (type) => {
    const stockCheck = {
      water: waterStock,
      light: lightStock,
      fertilizer: fertilizerStock,
    };

     // Weekly progress check
    const ok = updateWeeklyProgress(type);
    if (!ok) return; // stop if daily/weekly blocked

    const levelState = {
      water: [waterLevel, setWaterLevel],
      light: [lightLevel, setLightLevel],
      fertilizer: [fertilizerLevel, setFertilizerLevel],
    };

    if (stockCheck[type] <= 0) return;

    const [currentLevel, setLevel] = levelState[type];

    if (!canUseResource(type, currentLevel)) return;

    animatePress(type);

    const newVal = Math.min(currentLevel + 0.1, thresholds[type]); // respect threshold
    setLevel(newVal);

    // Update stock
    if (type === "water") setWaterStock((prev) => prev - 1);
    if (type === "light") setLightStock((prev) => prev - 1);
    if (type === "fertilizer") setFertilizerStock((prev) => prev - 1);

    // Update last action
    const updatedLastAction = { ...lastAction, [type]: Date.now() };
    setLastAction(updatedLastAction);

    savePlantData({
      [`${type}Level`]: newVal,
      [`${type}Stock`]: stockCheck[type] - 1,
      lastAction: updatedLastAction,
    });

    if (newVal >= thresholds[type]) reward();
  };

  // === Colors ===
  const getColor = (type) => {
    switch (type) {
      case "water":
        return "#004a94ff";
      case "light":
        return "#e2c000ff";
      case "fertilizer":
        return "#1d9b1dff";
      default:
        return "#3a7d44";
    }
  };

  // === Format cooldown time (h:m:s) ===
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  // === Stock ===
  const getStock = (type) => {
    if (type === "water") return waterStock;
    if (type === "light") return lightStock;
    if (type === "fertilizer") return fertilizerStock;
    return 0;
  };

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
        {cooldowns[type] > 0 && (
          <Text style={{ fontSize: 10, color: "gray" }}>
            ⏳ {formatTime(cooldowns[type])}
          </Text>
        )}

        <Progress.Bar
          progress={value}
          width={70}
          height={8}
          color={color}
          borderColor="#ccc"
          style={{ marginTop: 6 }}
          animated
        />
      </View>
    );
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 30 }}>
      {/* Plant Level & Points */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Plant Level: {plantLevel}</Text>
        <Text style={{ color: "green" }}>Points: {points}/30</Text>
        {points === 0 && (
          <Text style={{ color: "#4CAF50", fontStyle: "italic" }}>🌱 Leveled up!</Text>
        )}
      </View>

      {/* Resource Bars */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
        {bar("water", waterLevel, "water", "Water")}
        {bar("sunny", lightLevel, "light", "Sunlight")}
        {bar("leaf", fertilizerLevel, "fertilizer", "Fertilizer")}
      </View>
        <View style={styles.categoryContainer}>
  <Text style={styles.categoryHeader}>Category</Text>

   <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
        <View style={{ marginTop: 16, alignItems: "center" }}>
  <TouchableOpacity
    onPress={resetWaterCooldown}
    style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "#2196F3",
      borderRadius: 8,
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold" }}>Reset Water Cooldown</Text>
  </TouchableOpacity>
</View>
      </View>
        </ScrollView>
      </View>
    </View>
    
    
  );
}




const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    alignItems: "center",
    marginRight: 24,
    width: 60,
  },
  iconLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  iconValue: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginTop: 2,
  },
});
