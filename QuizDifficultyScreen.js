// QuizDifficultyScreen.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Animated,
  ActivityIndicator,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import TicTacToeAIScreen from "./TicTacToeAIScreen";
import TicTacToeScreen from "./TicTacToeScreen";
import { fetchQuestions } from "./quizData";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ----------------------------
// Firestore helpers
// ----------------------------
async function getUserRef() {
  const user = getAuth().currentUser;
  if (!user) throw new Error("No user logged in");
  return doc(db, "users", user.uid);
}

async function ensureUserDoc() {
  const ref = await getUserRef();
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { leafPoints: 0, inventory: [], scoreHistory: [] });
  }
  return ref;
}

async function addLeafPoints(amount) {
  const ref = await ensureUserDoc();
  const snap = await getDoc(ref);
  const current = snap.exists() ? snap.data().leafPoints || 0 : 0;
  await updateDoc(ref, { leafPoints: current + amount });
  return current + amount;
}

async function deductLeafPoints(amount) {
  const ref = await ensureUserDoc();
  const snap = await getDoc(ref);
  const current = snap.exists() ? snap.data().leafPoints || 0 : 0;
  if (current < amount) throw new Error("insufficient_points");
  const newBalance = Math.max(0, current - amount);
  await updateDoc(ref, { leafPoints: newBalance });
  return newBalance;
}

async function pushScoreHistory(entry) {
  const ref = await ensureUserDoc();
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  const history = Array.isArray(data.scoreHistory) ? [...data.scoreHistory] : [];
  history.push(entry);
  await updateDoc(ref, { scoreHistory: history });
}

async function upsertInventoryItem(newItem) {
  const ref = await ensureUserDoc();
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : {};
  const inventory = Array.isArray(data.inventory) ? [...data.inventory] : [];

  // Merge by name (increment quantity if exists)
  const idx = inventory.findIndex((i) => i.name === newItem.name);
  if (idx >= 0) {
    inventory[idx].quantity = (inventory[idx].quantity || 0) + (newItem.quantity || 1);
  } else {
    inventory.push({ ...newItem, quantity: newItem.quantity || 1 });
  }
  await updateDoc(ref, { inventory });
}

// ----------------------------
// Animated Button (consistent width)
// ----------------------------
function AnimatedButton({ title, color, icon, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }).start();
    setTimeout(onPress, 80);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={{ width: "100%", paddingHorizontal: 6 }}
    >
      <Animated.View style={[styles.mainButton, { backgroundColor: color, transform: [{ scale }] }]}>
        <Ionicons name={icon} size={20} color="#fff" />
        <Text style={styles.mainButtonText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ----------------------------
// Home Screen (real-time leafPoints)
// ----------------------------
export function HomeScreenWithQuiz({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let unsub;
      const start = async () => {
        const ref = await ensureUserDoc();
        unsub = onSnapshot(ref, (snap) => {
          if (snap.exists()) setLeafPoints(snap.data().leafPoints || 0);
        });
      };
      start();
      return () => unsub && unsub();
    }, [])
  );

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>🌿 LeafQuest</Text>
      <View style={styles.pointsRow}>
        <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
        <Text style={styles.pointsText}> {leafPoints} Leaf Points</Text>
      </View>

      <View style={styles.buttonColumn}>
        <AnimatedButton title="Start Quiz" color="#388E3C" icon="play-circle-outline" onPress={() => navigation.navigate("Taking Quiz")} />
        <AnimatedButton title="Score History" color="#6D4C41" icon="time-outline" onPress={() => navigation.navigate("Score History")} />
        <AnimatedButton title="Shop" color="#00796B" icon="cart-outline" onPress={() => navigation.navigate("Shop")} />
        <AnimatedButton title="Inventory" color="#4CAF50" icon="bag-outline" onPress={() => navigation.navigate("Inventory")} />
        <AnimatedButton title="Mini-Games" color="#8E44AD" icon="game-controller-outline" onPress={() => navigation.navigate("MiniGames Menu")} />
      </View>
    </View>
  );
}

// ----------------------------
// Quiz Screen
// - exit confirmation if user presses back
// - final popup showing result and saving to Firestore
// - tiered reward: score <4 => 0, score >=4 => score (4-10)
// ----------------------------
export function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchQuestions(10);
        if (!cancelled) setQuestions(data);
      } catch {
        if (!cancelled) setQuestions([{ question: "What does a plant need?", options: ["Sunlight", "Juice"], correct: "Sunlight" }]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => (cancelled = true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        setExitModalVisible(true);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBack);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBack);
    }, [])
  );

  const choose = (opt) => {
    if (showFeedback) return;
    const q = questions[idx];
    const correct = opt === q.correct || opt.text === q.correct || opt.isCorrect;
    setSelected(opt);
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const next = async () => {
    if (idx + 1 < questions.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
      return;
    }

    // finished
    const earned = score >= 4 ? score : 0;
    try {
      await addLeafPoints(earned);
      await pushScoreHistory({ date: new Date().toISOString(), score, total: questions.length, earned });
    } catch (err) {
      console.warn("Could not save quiz result", err);
    }

    // popup and navigate home
    Alert.alert("Quiz Finished", `You scored ${score}/${questions.length}\n+${earned} Leaf Points`, [
      { text: "OK", onPress: () => navigation.navigate("Home Menu") },
    ]);
  };

  if (loading)
    return (
      <View style={styles.centerPage}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );

  const q = questions[idx] || { question: "No questions", options: [] };

  return (
    <View style={styles.quizPage}>
      {/* Exit confirmation modal */}
      <Modal visible={exitModalVisible} transparent animationType="fade" onRequestClose={() => setExitModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setExitModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Exit Quiz?</Text>
              <Text style={styles.modalMessage}>Are you sure? Progress will not be saved.</Text>
              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#C8E6C9", flex: 1, marginRight: 6 }]} onPress={() => setExitModalVisible(false)}>
                  <Text style={{ textAlign: "center", color: "#1B5E20", fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#E57373", flex: 1 }]} onPress={() => navigation.navigate("Home Menu")}>
                  <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.questionCount}>Question {idx + 1} / {questions.length}</Text>
      <Text style={styles.quizTitle}>{q.question}</Text>

      {q.options.map((opt, i) => {
        const correct = opt === q.correct || opt.isCorrect;
        const chosen = selected === opt || selected?.text === opt?.text;
        // keep base button light so green highlight reads well
        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionButton,
              showFeedback && correct ? { backgroundColor: "#C8E6C9" } : null,
              showFeedback && chosen && !correct ? { backgroundColor: "#FFCDD2" } : null,
            ]}
            onPress={() => choose(opt)}
          >
            <Text style={styles.optionText}>{typeof opt === "string" ? opt : opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <TouchableOpacity style={styles.nextButton} onPress={next}>
          <Text style={styles.nextButtonText}>{idx + 1 === questions.length ? "Finish" : "Next"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ----------------------------
// Score History (live)
// ----------------------------
export function ScoreHistoryScreen() {
  const [history, setHistory] = useState([]);
  const fade = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let unsub;
      const start = async () => {
        const ref = await ensureUserDoc();
        unsub = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            const arr = Array.isArray(data.scoreHistory) ? [...data.scoreHistory].reverse() : [];
            setHistory(arr);
            Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }).start();
          } else {
            setHistory([]);
          }
        });
      };
      start();
      return () => unsub && unsub();
    }, [])
  );

  return (
    <Animated.View style={[styles.historyContainer, { opacity: fade }]}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      {!history.length ? (
        <Text style={{ textAlign: "center", color: "#1B5E20" }}>No history yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(it, i) => i.toString()}
          renderItem={({ item }) => {
            const d = new Date(item.date).toLocaleString();
            return (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{d} — {item.score}/{item.total} (+{item.earned || 0})</Text>
              </View>
            );
          }}
        />
      )}
    </Animated.View>
  );
}

// ----------------------------
// Shop (live)
// ----------------------------
export function ShopScreen() {
  const [leafPoints, setLeafPoints] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;

  const catalog = [
    { id: "w1", name: "Water", icon: "💧", cost: 10 },
    { id: "f1", name: "Fertilizer", icon: "🌿", cost: 20 },
    { id: "s1", name: "Sunlight", icon: "☀️", cost: 15 },
  ];

  useFocusEffect(
    useCallback(() => {
      let unsub;
      const start = async () => {
        const ref = await ensureUserDoc();
        unsub = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            setLeafPoints(snap.data().leafPoints || 0);
            Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
          }
        });
      };
      start();
      return () => unsub && unsub();
    }, [])
  );

  const buy = async (item) => {
    try {
      // Deduct then add inventory
      await deductLeafPoints(item.cost);
      await upsertInventoryItem({ name: item.name, icon: item.icon, quantity: 1 });
      Alert.alert("Purchase Successful", `You bought ${item.icon} ${item.name}`);
    } catch (err) {
      if (err.message === "insufficient_points") {
        Alert.alert("Not enough points", "You need more Leaf Points to buy this.");
      } else {
        console.error("Purchase error:", err);
        Alert.alert("Error", "Could not complete purchase.");
      }
    }
  };

  return (
    <Animated.View style={[styles.shopContainer, { opacity: fade }]}>
      <Text style={styles.quizTitle}>🛒 Shop</Text>
      <Text style={{ textAlign: "center", color: "#1B5E20", marginBottom: 10 }}>Your LeafPoints: {leafPoints}</Text>
      <FlatList
        data={catalog}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.shopCard} onPress={() => buy(item)} activeOpacity={0.85}>
            <Text style={styles.shopIcon}>{item.icon}</Text>
            <Text style={styles.shopItemTitle}>{item.name}</Text>
            <View style={styles.shopCostTag}>
              <Ionicons name="leaf-outline" size={14} color="#2E7D32" />
              <Text style={styles.shopCostText}>{item.cost}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
}

// ----------------------------
// Inventory (live)
// ----------------------------
export function InventoryScreen() {
  const [inventory, setInventory] = useState([]);
  const fade = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      let unsub;
      const start = async () => {
        const ref = await ensureUserDoc();
        unsub = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            setInventory(Array.isArray(snap.data().inventory) ? snap.data().inventory : []);
            Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
          } else {
            setInventory([]);
          }
        });
      };
      start();
      return () => unsub && unsub();
    }, [])
  );

  return (
    <Animated.View style={[styles.historyContainer, { opacity: fade }]}>
      <Text style={styles.quizTitle}>🎒 Inventory</Text>
      {!inventory.length ? (
        <Text style={{ textAlign: "center", color: "#1B5E20" }}>Inventory empty</Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(it, i) => i.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
          renderItem={({ item }) => (
            <View style={styles.inventoryCard}>
              <Text style={styles.inventoryIcon}>{item.icon ?? "📦"}</Text>
              <Text style={styles.inventoryName}>{item.name} {item.quantity && item.quantity > 1 ? `×${item.quantity}` : ""}</Text>
            </View>
          )}
        />
      )}
    </Animated.View>
  );
}

// ----------------------------
// Mini Games Menu
// ----------------------------
export function MiniGamesScreen({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => Animated.timing(fade, { toValue: 1, duration: 350, useNativeDriver: true }).start(), []);

  return (
    <Animated.View style={[styles.historyContainer, { opacity: fade }]}>
      <Text style={styles.quizTitle}>🎮 Mini Games</Text>
      <AnimatedButton title="Tic Tac Toe (PVP)" color="#43A047" icon="people-outline" onPress={() => navigation.navigate("TicTacToePVP")} />
      <AnimatedButton title="Tic Tac Toe (AI)" color="#2E7D32" icon="hardware-chip-outline" onPress={() => navigation.navigate("TicTacToeAI")} />
      <AnimatedButton title="Back to Menu" color="#6D4C41" icon="home-outline" onPress={() => navigation.navigate("Home Menu")} />
    </Animated.View>
  );
}

// ----------------------------
// Navigation Stack
// ----------------------------
const Stack = createNativeStackNavigator();
export default function QuizFeatureStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#C8E6C9" },
        headerTintColor: "#1B5E20",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Home Menu" component={HomeScreenWithQuiz} />
      <Stack.Screen name="Taking Quiz" component={QuizScreen} />
      <Stack.Screen name="Score History" component={ScoreHistoryScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="MiniGames Menu" component={MiniGamesScreen} />
      <Stack.Screen name="TicTacToePVP" component={TicTacToeScreen} options={{ title: "Tic Tac Toe (PVP)" }} />
      <Stack.Screen name="TicTacToeAI" component={TicTacToeAIScreen} options={{ title: "Tic Tac Toe (AI)" }} />
    </Stack.Navigator>
  );
}

// ----------------------------
// Styles
// ----------------------------
const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: "#E8F5E9", alignItems: "center", paddingTop: 56 },
  title: { fontSize: 26, fontWeight: "bold", color: "#2E7D32", marginBottom: 12 },
  pointsRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  pointsText: { color: "#1B5E20", fontSize: 16, marginLeft: 6 },
  buttonColumn: { width: "86%", gap: 12, alignItems: "center" },
  mainButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 14, borderRadius: 12, width: "100%", elevation: 3, shadowColor: "#000", shadowOpacity: 0.12, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  mainButtonText: { color: "#fff", fontWeight: "700", marginLeft: 10 },

  quizPage: { flex: 1, backgroundColor: "#DFF0D8", padding: 18 },
  quizTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#1B5E20", marginVertical: 8 },
  questionCount: { textAlign: "center", color: "#2E7D32", marginBottom: 10, fontWeight: "600" },
  optionButton: { backgroundColor: "#fff", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#DCEEDC", marginBottom: 10 },
  optionText: { textAlign: "center", color: "#1B5E20", fontSize: 16 },
  nextButton: { backgroundColor: "#2E7D32", padding: 14, borderRadius: 12, marginTop: 10 },
  nextButtonText: { color: "#fff", textAlign: "center", fontWeight: "700" },

  historyContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 18 },
  historyItem: { backgroundColor: "#FFFFFF", padding: 12, borderRadius: 10, marginBottom: 10 },
  historyText: { color: "#1B5E20" },

  shopContainer: { flex: 1, padding: 18, backgroundColor: "#E8F5E9" },
  shopCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, width: "48%", alignItems: "center", justifyContent: "center", elevation: 3 },
  shopIcon: { fontSize: 34 },
  shopItemTitle: { marginTop: 8, fontWeight: "600" },
  shopCostTag: { flexDirection: "row", alignItems: "center", marginTop: 8, backgroundColor: "#C8E6C9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  shopCostText: { marginLeft: 6, color: "#2E7D32", fontWeight: "700" },

  inventoryCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, width: "48%", alignItems: "center", justifyContent: "center", elevation: 3 },
  inventoryIcon: { fontSize: 36, marginBottom: 8 },
  inventoryName: { fontWeight: "600", color: "#2E7D32", textAlign: "center" },

  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalCard: { backgroundColor: "#fff", padding: 18, borderRadius: 10, width: "86%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1B5E20" },
  modalMessage: { fontSize: 14, color: "#333", marginTop: 8 },

  centerPage: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DFF0D8" },
});
