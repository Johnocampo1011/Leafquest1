// PlantStatusBar.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

/**
 * PlantStatusBar
 * Props:
 *  - plantId: string | number (id of plant doc under users/{uid}/plants/{plantId})
 *  - initialValues: optional initial state object
 *
 * Behavior summary:
 *  - Listens to plant document and user document (inventory) in real-time
 *  - Shows levels (water/light/fertilizer), plantLevel and points
 *  - Uses inventory (global per-user) and deducts an item from it when used
 *  - Updates the plant document atomically with new levels/points/lastAction/nextRecommended
 */

export default function PlantStatusBar({ plantId, initialValues = {} }) {
  const auth = getAuth();
  const user = auth.currentUser;

  // Guard if not logged in
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>⚠️ You must be logged in to view this plant.</Text>
      </View>
    );
  }

  const userId = user.uid;
  // string-ify plantId to match document id format
  const plantRef = doc(db, "users", userId, "plants", String(plantId));
  const userRef = doc(db, "users", userId);

  // Constants
  const WINDOW_DAYS = 1;
  const ON_TIME_POINTS = 10;
  const TOO_EARLY_PENALTY = 5;
  const LATE_POINTS = 5;
  const DECAY_RATE = 0.5;
  const msPerDay = 24 * 60 * 60 * 1000;
  const windowMs = WINDOW_DAYS * msPerDay;

  // Care defaults
  const careDefaults = {
    waterFrequency: initialValues?.care?.waterFrequency ?? 7,
    lightFrequency: initialValues?.care?.lightFrequency ?? 1,
    fertilizerFrequency: initialValues?.care?.fertilizerFrequency ?? 30,
    waterThreshold: initialValues?.care?.waterThreshold ?? 1,
    lightThreshold: initialValues?.care?.lightThreshold ?? 7,
    fertilizerThreshold: initialValues?.care?.fertilizerThreshold ?? 1,
  };

  // State (per-plant)
  const [waterLevel, setWaterLevel] = useState(initialValues?.waterLevel ?? 0.1);
  const [lightLevel, setLightLevel] = useState(initialValues?.lightLevel ?? 0.1);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizerLevel ?? 0.1);
  const [plantLevel, setPlantLevel] = useState(initialValues?.plantLevel ?? 1);
  const [points, setPoints] = useState(initialValues?.points ?? 0);
  const [lastAction, setLastAction] = useState(initialValues?.lastAction || { water: 0, light: 0, fertilizer: 0 });
  const [nextRecommended, setNextRecommended] = useState(initialValues?.nextRecommended || { water: 0, light: 0, fertilizer: 0 });

  // Inventory (global per-user)
  const [inventory, setInventory] = useState([]); // array of { name, icon, quantity }

  // UI helpers
  const [loadingPlant, setLoadingPlant] = useState(true);
  const [loadingInventory, setLoadingInventory] = useState(true);

  // cooldown refs & state
  const cooldownRef = useRef({ water: 0, light: 0, fertilizer: 0 });
  const [cooldowns, _setCooldowns] = useState(cooldownRef.current);
  const setCooldowns = (updateFn) => {
    _setCooldowns((prev) => {
      const next = typeof updateFn === "function" ? updateFn(prev) : updateFn;
      cooldownRef.current = next;
      return next;
    });
  };

  // mountedRef to avoid state update after unmount
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Animations (kept simple)
  const scaleAnims = useRef({
    water: new Animated.Value(1),
    light: new Animated.Value(1),
    fertilizer: new Animated.Value(1),
  }).current;
  const animatePress = useCallback((type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], { toValue: 1.15, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnims[type], { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  }, [scaleAnims]);

  // frequency ms helper
  const freqMs = useCallback(
    (type) => {
      const freq = careDefaults?.[`${type}Frequency`];
      return freq && freq > 0 ? freq * msPerDay : msPerDay;
    },
    [careDefaults]
  );

  // Save helper for plant (merge)
  const savePlantData = useCallback(async (updatedData = {}) => {
    try {
      await setDoc(plantRef, updatedData, { merge: true });
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  }, [plantRef]);

  // ---------- Listen to plant doc (live) ----------
  useEffect(() => {
    setLoadingPlant(true);
    let unsubPlant = () => {};
    try {
      unsubPlant = onSnapshot(
        plantRef,
        (snap) => {
          if (!mountedRef.current) return;
          if (snap.exists()) {
            const data = snap.data();
            // Defensive defaults
            setPoints(typeof data.points === "number" ? data.points : 0);
            setPlantLevel(typeof data.plantLevel === "number" ? data.plantLevel : 1);
            setWaterLevel(typeof data.waterLevel === "number" ? data.waterLevel : 0);
            setLightLevel(typeof data.lightLevel === "number" ? data.lightLevel : 0);
            setFertilizerLevel(typeof data.fertilizerLevel === "number" ? data.fertilizerLevel : 0);
            setLastAction(data.lastAction || { water: 0, light: 0, fertilizer: 0 });
            setNextRecommended(data.nextRecommended || { water: 0, light: 0, fertilizer: 0 });
          } else {
            // Plant doc missing — initialize minimal document to avoid re-fetch loops
            const now = Date.now();
            const initialNext = {
              water: now + freqMs("water"),
              light: now + freqMs("light"),
              fertilizer: now + freqMs("fertilizer"),
            };
            const payload = {
              plantId: String(plantId),
              plantLevel: plantLevel,
              points: points,
              waterLevel: waterLevel,
              lightLevel: lightLevel,
              fertilizerLevel: fertilizerLevel,
              lastAction: lastAction,
              nextRecommended: initialNext,
              care: careDefaults,
              createdAt: now,
            };
            setDoc(plantRef, payload, { merge: true }).catch((e) => console.error("init plant doc failed:", e));
          }
          if (mountedRef.current) setLoadingPlant(false);
        },
        (err) => {
          console.error("Plant onSnapshot error:", err);
          if (mountedRef.current) setLoadingPlant(false);
        }
      );
    } catch (e) {
      console.error("Failed to subscribe plantRef:", e);
      setLoadingPlant(false);
    }

    return () => {
      try { unsubPlant(); } catch (e) { /* noop */ }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId]);

  // ---------- Listen to user doc (inventory) ----------
  useEffect(() => {
    setLoadingInventory(true);
    let unsubUser = () => {};
    try {
      unsubUser = onSnapshot(
        userRef,
        (snap) => {
          if (!mountedRef.current) return;
          if (snap.exists()) {
            const data = snap.data();
            const inv = Array.isArray(data.inventory) ? data.inventory : [];
            setInventory(inv);
          } else {
            // initialize user doc minimal inventory if needed
            setDoc(userRef, { leafPoints: 0, inventory: [] }, { merge: true }).catch((e) =>
              console.error("init user doc failed:", e)
            );
            setInventory([]);
          }
          if (mountedRef.current) setLoadingInventory(false);
        },
        (err) => {
          console.error("User onSnapshot error:", err);
          if (mountedRef.current) setLoadingInventory(false);
        }
      );
    } catch (e) {
      console.error("Failed to subscribe userRef:", e);
      setLoadingInventory(false);
    }

    return () => {
      try { unsubUser(); } catch (e) { /* noop */ }
    };
  }, [userId]);

  // cooldown timer decrement
  useEffect(() => {
    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const updated = { ...prev };
        for (const k of Object.keys(updated)) updated[k] = Math.max(0, (updated[k] || 0) - 1);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // evaluate timing
  const evaluateTiming = useCallback(
    (type, now) => {
      const last = lastAction?.[type] || 0;
      const period = freqMs(type);
      if (last === 0) return "onTime";
      const recommended = last + period;
      const startOnTime = recommended - windowMs;
      const endOnTime = recommended + windowMs;
      if (now < startOnTime) return "tooEarly";
      if (now >= startOnTime && now <= endOnTime) return "onTime";
      return "late";
    },
    [lastAction, freqMs]
  );

  // handle level up
  const handleLevelUp = useCallback(
    async (currentPoints, currPlantLevel) => {
      if (currentPoints >= 30) {
        const now = Date.now();
        const newLevel = currPlantLevel + 1;
        const resetAction = { water: now, light: now, fertilizer: now };
        const resetNext = {
          water: now + freqMs("water"),
          light: now + freqMs("light"),
          fertilizer: now + freqMs("fertilizer"),
        };

        // local
        setPlantLevel(newLevel);
        setWaterLevel(0);
        setLightLevel(0);
        setFertilizerLevel(0);
        setLastAction(resetAction);
        setNextRecommended(resetNext);

        // persist
        await savePlantData({
          plantLevel: newLevel,
          points: 0,
          lastAction: resetAction,
          nextRecommended: resetNext,
          waterLevel: 0,
          lightLevel: 0,
          fertilizerLevel: 0,
        });

        return 0;
      }
      return currentPoints;
    },
    [freqMs, savePlantData]
  );

  // ---------- Use item (water / light / fertilizer) ----------
  const increase = useCallback(
    async (type) => {
      // map to inventory name
      const nameMap = { water: "Water", light: "Sunlight", fertilizer: "Fertilizer" };
      const itemName = nameMap[type];

      // find item in inventory array
      const idx = inventory.findIndex((it) => it && it.name === itemName);
      if (idx === -1 || (inventory[idx].quantity || 0) <= 0) {
        Alert.alert("Out of stock", `You don't have any ${itemName} left.`);
        return;
      }

      // threshold check
      const threshold = careDefaults[`${type}Threshold`];
      const currentLevel = type === "water" ? waterLevel : type === "light" ? lightLevel : fertilizerLevel;
      if (currentLevel >= threshold) {
        Alert.alert("⚠️ Limit reached!", `${itemName} has reached its safe threshold.`);
        return;
      }

      // timing, points, new values
      const now = Date.now();
      const timing = evaluateTiming(type, now);
      const newInventory = inventory.map((it) => ({ ...it })); // shallow copy
      newInventory[idx].quantity = Math.max(0, (newInventory[idx].quantity || 0) - 1);

      const newValue = Math.min(currentLevel + 0.1, threshold);
      const updatedLastAction = { ...lastAction, [type]: now };
      const updatedNextRecommended = { ...nextRecommended, [type]: now + freqMs(type) };

      let newPoints = points;
      if (timing === "onTime") newPoints += ON_TIME_POINTS;
      else if (timing === "tooEarly") newPoints = Math.max(0, newPoints - TOO_EARLY_PENALTY);
      else newPoints += LATE_POINTS;

      // level-up check (may reset points)
      const finalPoints = await handleLevelUp(newPoints, plantLevel);

      // batch updates for plant
      const plantUpdates = {
        [`${type}Level`]: newValue,
        lastAction: updatedLastAction,
        nextRecommended: updatedNextRecommended,
        points: finalPoints,
      };

      try {
        // persist plant updates
        await savePlantData(plantUpdates);

        // persist user inventory (save full array)
        await updateDoc(userRef, { inventory: newInventory });

        // local updates
        if (type === "water") setWaterLevel(newValue);
        if (type === "light") setLightLevel(newValue);
        if (type === "fertilizer") setFertilizerLevel(newValue);
        setInventory(newInventory);
        setLastAction(updatedLastAction);
        setNextRecommended(updatedNextRecommended);
        setPoints(finalPoints);

        // cooldown
        setCooldowns((prev) => ({ ...prev, [type]: 10 }));

        // animate + feedback
        animatePress(type);
        if (timing === "onTime") Alert.alert("✅ Good timing!", `You gained ${ON_TIME_POINTS} points.`);
        else if (timing === "tooEarly") Alert.alert("⚠️ Too early", `You cared too early. ${TOO_EARLY_PENALTY} points deducted.`);
        else Alert.alert("⏳ Late care", `You get ${LATE_POINTS} points (reduced).`);
      } catch (err) {
        console.error("Error applying item:", err);
        Alert.alert("Error", "Could not apply item. Try again.");
      }
    },
    [
      inventory,
      waterLevel,
      lightLevel,
      fertilizerLevel,
      points,
      plantLevel,
      careDefaults,
      lastAction,
      nextRecommended,
      freqMs,
      evaluateTiming,
      handleLevelUp,
      savePlantData,
      userRef,
      animatePress,
    ]
  );

  // UI helpers
  const getColor = (type) => (type === "water" ? "#004a94ff" : type === "light" ? "#e2c000ff" : "#1d9b1dff");
  const getStockForType = (type) => {
    const nameMap = { water: "Water", light: "Sunlight", fertilizer: "Fertilizer" };
    return inventory.find((i) => i && i.name === nameMap[type])?.quantity || 0;
  };

  // Build bar UI
  const bar = (icon, value, type, label) => {
    const color = getColor(type);
    const threshold = careDefaults[`${type}Threshold`] ?? 1;
    const progressValue = Math.min(1, (value ?? 0) / threshold);
    const stock = getStockForType(type);
    const isDisabled = stock <= 0 || (cooldowns[type] || 0) > 0;

    // compute next text (friendly)
    const now = Date.now();
    const last = lastAction?.[type] || 0;
    const recommended = last + freqMs(type);
    const startOnTime = recommended - windowMs;
    const endOnTime = recommended + windowMs;
    const nextTs = nextRecommended?.[type] || 0;
    let nextText = "—";
    if (nextTs > 0) {
      if (now < startOnTime) {
        const secs = Math.ceil((startOnTime - now) / 1000);
        nextText = `Next in ${formatTime(secs)}`;
      } else if (now >= startOnTime && now <= endOnTime) {
        nextText = "Now (on-time window)";
      } else {
        const secs = Math.ceil((nextTs - now) / 1000);
        nextText = `Next in ${formatTime(secs)}`;
      }
    }

    return (
      <View key={type} style={styles.barColumn}>
        <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
          <TouchableOpacity
            onPress={() => increase(type)}
            disabled={isDisabled}
            style={[
              styles.circleButton,
              { borderColor: color, backgroundColor: `${color}20`, opacity: isDisabled ? 0.4 : 1 },
            ]}
          >
            <Ionicons name={icon} size={24} color={color} />
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>{stock}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.barLabel}>{label}</Text>
        {cooldowns[type] > 0 && <Text style={styles.cooldownText}>⏳ {formatTime(cooldowns[type])}</Text>}
        <Text style={styles.nextText}>{nextText}</Text>

        <Progress.Bar
          progress={Number.isFinite(progressValue) ? Math.max(0, Math.min(1, progressValue)) : 0}
          width={70}
          height={8}
          color={color}
          borderColor="#ccc"
          animated={true}
          style={{ marginTop: 6 }}
        />
      </View>
    );
  };

  // small formatter
  function formatTime(secs) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  // Loading state show
  if (loadingPlant || loadingInventory) {
    return (
      <View style={[styles.centered, { minHeight: 140 }]}>
        <ActivityIndicator size="small" color="#2E7D32" />
        <Text style={{ marginTop: 8, color: "#2E7D32" }}>Loading plant status...</Text>
      </View>
    );
  }

  // Render
  return (
    <View style={styles.root}>
      <View style={styles.statusHeader}>
        <Text style={styles.levelText}>Plant Level: {plantLevel}</Text>
        <Text style={styles.pointsText}>Points: {points}/30</Text>
        {points === 0 && <Text style={styles.levelUpText}>🌱 Leveled up!</Text>}
      </View>

      <View style={styles.barsRow}>
        {bar("water", waterLevel, "water", "Water")}
        {bar("sunny", lightLevel, "light", "Sunlight")}
        {bar("leaf", fertilizerLevel, "fertilizer", "Fertilizer")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", marginBottom: 30, width: "100%" },
  centered: { padding: 20, alignItems: "center", justifyContent: "center" },
  statusHeader: { marginBottom: 16, alignItems: "center" },
  levelText: { fontWeight: "bold", fontSize: 16 },
  pointsText: { color: "green" },
  levelUpText: { color: "#4CAF50", fontStyle: "italic" },

  barsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  barColumn: { alignItems: "center" },

  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
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

  barLabel: { fontSize: 12, marginTop: 6 },
  cooldownText: { fontSize: 10, color: "gray", marginTop: 4 },
  nextText: { fontSize: 10, color: "gray", marginTop: 2 },
});
