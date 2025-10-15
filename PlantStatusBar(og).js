// PlantStatusBar.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  Alert,
  StyleSheet,
  AppState,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
// Optional: import CombinedPlantInfo if you want to show it here
// import CombinedPlantInfo from "./PlantInfoTab";

export default function PlantStatusBar({ plantId, initialValues = {} }) {
  const auth = getAuth();
  const user = auth.currentUser;

  // if no user, short-circuit UI (safe guard)
  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red" }}>⚠️ You must be logged in to view this plant.</Text>
      </View>
    );
  }

  const userId = user.uid;
  const plantRef = doc(db, "users", userId, "plants", plantId);

  // === Constants ===
  const WINDOW_DAYS = 1;
  const ON_TIME_POINTS = 10;
  const TOO_EARLY_PENALTY = 5;
  const LATE_POINTS = 5;
  const DECAY_RATE = 0.5;
  const msPerDay = 24 * 60 * 60 * 1000;
  const windowMs = WINDOW_DAYS * msPerDay;

  // === Care defaults (won't change per render) ===
  const careDefaults = {
    waterFrequency: initialValues?.care?.waterFrequency ?? 7,
    lightFrequency: initialValues?.care?.lightFrequency ?? 1,
    fertilizerFrequency: initialValues?.care?.fertilizerFrequency ?? 30,
    waterThreshold: initialValues?.care?.waterThreshold ?? 1,
    lightThreshold: initialValues?.care?.lightThreshold ?? 7,
    fertilizerThreshold: initialValues?.care?.fertilizerThreshold ?? 1,
  };

  // === State ===
  const [waterLevel, setWaterLevel] = useState(initialValues?.waterLevel ?? 0.1);
  const [lightLevel, setLightLevel] = useState(initialValues?.lightLevel ?? 0.1);
  const [fertilizerLevel, setFertilizerLevel] = useState(initialValues?.fertilizerLevel ?? 0.1);
  const [plantLevel, setPlantLevel] = useState(initialValues?.plantLevel ?? 1);
  const [points, setPoints] = useState(initialValues?.points ?? 0);

  const [waterStock, setWaterStock] = useState(initialValues?.waterStock ?? 10);
  const [lightStock, setLightStock] = useState(initialValues?.lightStock ?? 10);
  const [fertilizerStock, setFertilizerStock] = useState(initialValues?.fertilizerStock ?? 10);

  const [lastAction, setLastAction] = useState(initialValues?.lastAction || { water: 0, light: 0, fertilizer: 0 });
  const [nextRecommended, setNextRecommended] = useState(initialValues?.nextRecommended || { water: 0, light: 0, fertilizer: 0 });
  const cooldownRef = useRef({ water: 0, light: 0, fertilizer: 0 });
  const [cooldowns, _setCooldowns] = useState(cooldownRef.current);
  const setCooldowns = (updateFn) => {
    _setCooldowns((prev) => {
    const next = typeof updateFn === "function" ? updateFn(prev) : updateFn;
    cooldownRef.current = next; // ✅ always keep ref in sync
    return next;
  });
};


  // track mounted to avoid state updates after unmount
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // auth state listener - graceful handling if user signs-out
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) {
        // optional: notify user or navigate
        // Alert.alert("Signed out", "Please sign in again.");
      }
    });
    return unsub;
  }, [auth]);

  // === Animations (memoized single ref object) ===
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

  // === Helper functions ===
  const freqMs = useCallback(
  (type) => {
    const freq = careDefaults?.[`${type}Frequency`];
    if (!freq || freq <= 0) return msPerDay; // ✅ default to 1 day minimum
    return freq * msPerDay;
  },
  [careDefaults]
);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  // Save helper (batched updates)
  const savePlantData = useCallback(async (updatedData = {}) => {
    try {
      await setDoc(plantRef, updatedData, { merge: true });
    } catch (error) {
      console.error("Error saving plant data:", error);
    }
  }, [plantRef]);

  // === Fetch & initialize (safe with mountedRef) ===
  useEffect(() => {
    let isActive = true;
    const fetchPlantData = async () => {
      try {
        const snap = await getDoc(plantRef);
        if (!isActive) return;

        if (snap.exists()) {
          const data = snap.data();

          

          const savedCare = data.care || careDefaults;

          // load saved levels (or keep current)
          const savedLevels = {
            waterLevel: data.waterLevel ?? waterLevel,
            lightLevel: data.lightLevel ?? lightLevel,
            fertilizerLevel: data.fertilizerLevel ?? fertilizerLevel,
          };

          const savedLastAction = data.lastAction || lastAction;
          const savedNextRecommended = data.nextRecommended || nextRecommended;

          // Apply decay for each resource
          const now = Date.now();
          const decayedLevels = { ...savedLevels };
          ["water", "light", "fertilizer"].forEach((type) => {
            const last = savedLastAction?.[type] || 0;
            if (last > 0) {
              const elapsedMs = now - last;
              const periodMs = (savedCare?.[`${type}Frequency`] ?? careDefaults[`${type}Frequency`]) * msPerDay;
              const fraction = Math.min(1, elapsedMs / periodMs);
              const prevVal = savedLevels[`${type}Level`] ?? 0;
              const loss = fraction * DECAY_RATE * prevVal;
              const newVal = Math.max(0, prevVal - loss);
              const threshold = savedCare?.[`${type}Threshold`] ?? careDefaults[`${type}Threshold`];
              decayedLevels[`${type}Level`] = Math.min(newVal, threshold);
            }
          });

          // set states (only if still mounted)
          if (mountedRef.current) {
  setWaterLevel(decayedLevels.waterLevel);
  setLightLevel(decayedLevels.lightLevel);
  setFertilizerLevel(decayedLevels.fertilizerLevel);
  setPlantLevel(data.plantLevel ?? plantLevel);
  setPoints(data.points ?? points);
  setWaterStock(data.waterStock ?? waterStock);
  setLightStock(data.lightStock ?? lightStock);
  setFertilizerStock(data.fertilizerStock ?? fertilizerStock);
  setLastAction(savedLastAction);
  setNextRecommended((prev) => {
    const merged = { ...prev };
    for (const key of ["water", "light", "fertilizer"]) {
    // ✅ Don’t overwrite if cooldown still active
    if (cooldownRef.current[key] === 0) merged[key] = savedNextRecommended[key];
    }
  return merged;
  });
}

        } else {
          // initialize document (only if not existing)
          const now = Date.now();
          const initialNext = {
            water: now + freqMs("water"),
            light: now + freqMs("light"),
            fertilizer: now + freqMs("fertilizer"),
          };

          const payload = {
            ...categoryInfo,
            ...initialValues,
            care: careDefaults,
            waterLevel,
            lightLevel,
            fertilizerLevel,
            plantLevel,
            points,
            waterStock,
            lightStock,
            fertilizerStock,
            lastAction,
            nextRecommended: initialNext,
          };

          if (mountedRef.current) {
            await setDoc(plantRef, payload);
            setNextRecommended(initialNext);
          }
        }
      } catch (err) {
        console.error("Error fetching plant data:", err);
      }
    };

    fetchPlantData();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId]); // intentionally minimal dependencies to avoid refetch loops

  // === Cooldown decrement timer ===
useEffect(() => {
  const interval = setInterval(() => {
    setCooldowns((prev) => {
      const updated = {};
      for (const key in prev) {
        updated[key] = Math.max(0, prev[key] - 1);
      }
      return updated;
    });
  }, 1000);
  return () => clearInterval(interval);
}, []);
  // === Level up helper (resets times & persists atomically) ===
  const handleLevelUp = useCallback(async (currentPoints, currPlantLevel) => {
    if (currentPoints >= 30) {
      const now = Date.now();
      const newLevel = currPlantLevel + 1;

      const resetAction = { water: now, light: now, fertilizer: now };
      const resetNext = {
        water: now + freqMs("water"),
        light: now + freqMs("light"),
        fertilizer: now + freqMs("fertilizer"),
      };

      // update local state
      setPlantLevel(newLevel);
      setWaterLevel(0);
      setLightLevel(0);
      setFertilizerLevel(0);
      setLastAction(resetAction);
      setNextRecommended(resetNext);

      // persist atomically
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
  }, [freqMs, savePlantData]);

  const evaluateTiming = useCallback((type, now) => {
    const last = lastAction?.[type] || 0;
    const period = freqMs(type);
    if (last === 0) return "onTime";
    const recommended = last + period;
    const startOnTime = recommended - windowMs;
    const endOnTime = recommended + windowMs;
    if (now < startOnTime) return "tooEarly";
    if (now >= startOnTime && now <= endOnTime) return "onTime";
    return "late";
  }, [lastAction, freqMs]);

  // === Increase action (single batched save) ===
  const increase = useCallback(async (type) => {
    const stockMap = {
      water: [waterStock, setWaterStock, setWaterLevel, waterLevel],
      light: [lightStock, setLightStock, setLightLevel, lightLevel],
      fertilizer: [fertilizerStock, setFertilizerStock, setFertilizerLevel, fertilizerLevel],
    };

    const [stock, setStock, setLevel, levelValue] = stockMap[type];
    if (stock <= 0) {
      Alert.alert("Out of stock", `You don't have any ${type} left.`);
      return;
    }

    const threshold = careDefaults[`${type}Threshold`];
    if (levelValue >= threshold) {
      Alert.alert("⚠️ Limit reached!", `${type} has reached its safe threshold.`);
      return;
    }

    const now = Date.now();
    const timing = evaluateTiming(type, now);
    const newStock = stock - 1;
    const increment = 0.1;
    const newVal = Math.min(levelValue + increment, threshold);

    const updatedLastAction = { ...lastAction, [type]: now };
    const updatedNextRecommended = { ...nextRecommended, [type]: now + freqMs(type) };

    // compute points locally first
    let newPoints = points;
    if (timing === "onTime") newPoints = newPoints + ON_TIME_POINTS;
    else if (timing === "tooEarly") newPoints = Math.max(0, newPoints - TOO_EARLY_PENALTY);
    else newPoints = newPoints + LATE_POINTS;

    // handle level-up (may modify points/levels and persist)
    const finalPoints = await handleLevelUp(newPoints, plantLevel);

    // prepare batched update
    const updates = {
      [`${type}Level`]: newVal,
      [`${type}Stock`]: newStock,
      lastAction: updatedLastAction,
      nextRecommended: updatedNextRecommended,
      points: finalPoints,
    };

    // persist once
    await savePlantData(updates);

    // update local state (after successful save)
    setStock(newStock);
    setLevel(newVal);
    setLastAction(updatedLastAction);
    setNextRecommended(updatedNextRecommended);
    setPoints(finalPoints);
    setCooldowns((prev) => ({
  ...prev,
  [type]: 10, // 10-second cooldown before you can press again
}));

    // animate
    animatePress(type);

    // user feedback
    if (timing === "onTime") Alert.alert("✅ Good timing!", `You gained ${ON_TIME_POINTS} points.`);
    else if (timing === "tooEarly") Alert.alert("⚠️ Too early", `You cared too early. ${TOO_EARLY_PENALTY} points deducted.`);
    else Alert.alert("⏳ Late care", `You get ${LATE_POINTS} points (reduced).`);
  }, [
    waterStock, lightStock, fertilizerStock,
    waterLevel, lightLevel, fertilizerLevel,
    lastAction, nextRecommended, points, plantLevel,
    freqMs, careDefaults, evaluateTiming, handleLevelUp, savePlantData, animatePress,
  ]);

  // === UI helpers ===
  const getColor = (type) => (type === "water" ? "#004a94ff" : type === "light" ? "#e2c000ff" : "#1d9b1dff");
  const getStock = (type) => (type === "water" ? waterStock : type === "light" ? lightStock : fertilizerStock);
  const getLevel = (type) => (type === "water" ? waterLevel : type === "light" ? lightLevel : fertilizerLevel);

  // Bar component generator
  const bar = (icon, value, type, label) => {
    const color = getColor(type);
    const stock = getStock(type);
    // disabled if no stock OR cooldown active
    const isDisabled = stock <= 0 || (cooldowns[type] > 0);

    // compute next text using lastAction to be consistent with evaluateTiming
    const now = Date.now();
    const last = lastAction?.[type] || 0;
    const recommended = last + freqMs(type);
    const startOnTime = recommended - windowMs;
    const endOnTime = recommended + windowMs;
    const nextTs = nextRecommended?.[type] || 0;

    let nextText = "—";
      if (nextTs > 0) {
      if (now < startOnTime) nextText = `Next in ${formatTime(Math.ceil((startOnTime - now) / 1000))}`;
      else if (now >= startOnTime && now <= endOnTime) nextText = "Now (on-time window)";
      else nextText = `Next in ${formatTime(Math.ceil((nextTs - now) / 1000))}`;
}


    // ensure Progress.Bar progress between 0 and 1 (normalized by threshold)
    const threshold = careDefaults[`${type}Threshold`] ?? 1;
    const progressValue = Math.min(1, (value ?? 0) / threshold);

    return (
      <View key={type} style={styles.barColumn}>
        <Animated.View style={{ transform: [{ scale: scaleAnims[type] }] }}>
          <TouchableOpacity
            onPress={() => increase(type)}
            disabled={!!isDisabled} // defensive: ensure boolean
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
          tyle={{ marginTop: 6 }}
          animated={true}
/>
      </View>
    );
  };


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

      {/* If you want the combined info card in the same component, uncomment below */}
      {/* <CombinedPlantInfo categoryInfo={categoryInfo} plant={plantDataForInfo} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", marginBottom: 30, width: "100%" },
  centered: { padding: 20 },
  statusHeader: { marginBottom: 16, alignItems: "center" },
  levelText: { fontWeight: "bold", fontSize: 16 },
  pointsText: { color: "green" },
  levelUpText: { color: "#4CAF50", fontStyle: "italic" },

  barsRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
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

  // category / layout styles (kept for compatibility)
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
  iconBox: { alignItems: "center", marginRight: 24, width: 60 },
  iconLabel: { marginTop: 9, fontSize: 14, fontWeight: "600", color: "#333", textAlign: "center" },
  iconValue: { fontSize: 12, color: "#555", textAlign: "center", marginTop: 2 },
});
