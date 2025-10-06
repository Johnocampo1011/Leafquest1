// QuizFeature.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchQuestions } from "./quizData"; // expects client Firestore usage
import { db } from "./firebaseConfig"; // your client firebase config (not admin)
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

import TicTacToeScreen from "./TicTacToeScreen";

// ------------------------
// Local keys (fallback)
// ------------------------
const ASYNC_POINTS_KEY = "leafPoints";
const ASYNC_HISTORY_KEY = "quizHistory";

// points multiplier per correct answer
const POINTS_PER_CORRECT = 5;

// ------------------------
// Helper: get current user (may be null if not signed in)
// ------------------------
function getCurrentUser() {
  try {
    const auth = getAuth();
    return auth.currentUser || null;
  } catch (e) {
    return null;
  }
}

// ------------------------
// Firestore "ensure user doc" helper (creates doc if missing)
// ------------------------
async function ensureUserDoc(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, { leafPoints: 0, quizHistory: [] });
    }
    return userRef;
  } catch (e) {
    console.log("ensureUserDoc error:", e);
    throw e;
  }
}

// ------------------------
// Get leaf points (Firestore preferred, fallback to AsyncStorage)
// ------------------------
async function getLeafPointsForUser() {
  const user = getCurrentUser();
  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) return Number(snap.data().leafPoints ?? 0);
    } catch (e) {
      console.log("Error reading points from Firestore:", e);
    }
  }

  // fallback to local storage
  try {
    const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

// ------------------------
// Add leaf points to user (Firestore preferred, fallback to AsyncStorage)
// Returns the updated total (number) or null on failure
// ------------------------
async function addLeafPointsForUser(pointsToAdd) {
  const user = getCurrentUser();
  if (user) {
    try {
      const userRef = await ensureUserDoc(user.uid);
      // atomic increment
      await updateDoc(userRef, { leafPoints: increment(pointsToAdd) });
      const updatedSnap = await getDoc(userRef);
      return updatedSnap.exists() ? Number(updatedSnap.data().leafPoints ?? 0) : null;
    } catch (e) {
      console.log("Error adding points in Firestore, falling back:", e);
    }
  }

  // fallback to AsyncStorage
  try {
    const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
    const current = stored ? parseInt(stored, 10) : 0;
    const updated = current + pointsToAdd;
    await AsyncStorage.setItem(ASYNC_POINTS_KEY, String(updated));
    return updated;
  } catch (e) {
    console.log("Error updating local points:", e);
    return null;
  }
}

// ------------------------
// Spend points (attempt to deduct); returns { success, remaining }
// ------------------------
async function spendLeafPointsForUser(cost) {
  const user = getCurrentUser();
  if (user) {
    try {
      const userRef = await ensureUserDoc(user.uid);
      const snap = await getDoc(userRef);
      const current = Number(snap.data().leafPoints ?? 0);
      if (current >= cost) {
        await updateDoc(userRef, {
          leafPoints: current - cost,
          quizHistory: arrayUnion({ type: "spend", cost, date: new Date().toISOString() }),
        });
        return { success: true, remaining: current - cost };
      } else {
        return { success: false, remaining: current };
      }
    } catch (e) {
      console.log("Error spending points (Firestore):", e);
    }
  }

  // fallback to AsyncStorage
  try {
    const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
    const current = stored ? parseInt(stored, 10) : 0;
    if (current >= cost) {
      const updated = current - cost;
      await AsyncStorage.setItem(ASYNC_POINTS_KEY, String(updated));
      // record local history too
      const h = JSON.parse((await AsyncStorage.getItem(ASYNC_HISTORY_KEY)) || "[]");
      h.push({ type: "spend", cost, date: new Date().toISOString() });
      await AsyncStorage.setItem(ASYNC_HISTORY_KEY, JSON.stringify(h));
      return { success: true, remaining: updated };
    } else {
      return { success: false, remaining: current };
    }
  } catch (e) {
    console.log("Error spending points (local):", e);
    return { success: false, remaining: 0 };
  }
}

// ------------------------
// Save quiz attempt (Firestore preferred, fallback to AsyncStorage)
// entry: { score, total, earnedPoints, date }
// ------------------------
async function saveQuizAttemptForUser(entry) {
  const user = getCurrentUser();
  if (user) {
    try {
      const userRef = await ensureUserDoc(user.uid);
      await updateDoc(userRef, {
        quizHistory: arrayUnion(entry),
      });
      return true;
    } catch (e) {
      console.log("Error saving history to Firestore:", e);
    }
  }

  // fallback to AsyncStorage
  try {
    const stored = await AsyncStorage.getItem(ASYNC_HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    history.push(entry);
    await AsyncStorage.setItem(ASYNC_HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (e) {
    console.log("Error saving history locally:", e);
    return false;
  }
}

// ------------------------
// Fetch quiz history (Firestore preferred, fallback to AsyncStorage)
// ------------------------
async function fetchQuizHistoryForUser() {
  const user = getCurrentUser();
  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) return snap.data().quizHistory ?? [];
    } catch (e) {
      console.log("Error fetching history from Firestore:", e);
    }
  }

  try {
    const stored = await AsyncStorage.getItem(ASYNC_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// ------------------------
// Home Screen
// ------------------------
export function HomeScreenWithQuiz({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);
  const [loadingPoints, setLoadingPoints] = useState(true);

  useEffect(() => {
    const loadPoints = async () => {
      setLoadingPoints(true);
      const pts = await getLeafPointsForUser();
      setLeafPoints(pts);
      setLoadingPoints(false);
    };
    const unsub = navigation.addListener("focus", loadPoints);
    loadPoints();
    return unsub;
  }, [navigation]);

  return (
    <View style={styles.homeContainer}>
      {/* top-right points badge */}
      <View style={styles.pointsBadge}>
        <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
        <Text style={styles.pointsText}>{loadingPoints ? "…" : leafPoints}</Text>
      </View>

      <Text style={styles.title}>🌱 Welcome to LeafQuest!</Text>

      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#388E3C" }]}
          onPress={() => navigation.navigate("QuizScreen")}
        >
          <Ionicons name="play-circle-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#6D4C41" }]}
          onPress={() => navigation.navigate("ScoreHistoryScreen")}
        >
          <Ionicons name="time-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#00796B" }]}
          onPress={() => navigation.navigate("ShopScreen")}
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#4CAF50" }]}
          onPress={() => navigation.navigate("InventoryScreen")}
       >
         <Ionicons name="bag-outline" size={22} color="#fff" />
         <Text style={styles.mainButtonText}>Inventory</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#8E44AD" }]}
          onPress={() => navigation.navigate("MiniGamesScreen")}
        >
          <Ionicons name="game-controller-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>Mini-Games</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ------------------------
// Quiz Screen
// ------------------------
export function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // load quiz questions (from quizData.js which reads Firestore)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchQuestions(10); // default 10
      if (!mounted) return;
      setQuestions(data);
      setCurrentIndex(0);
      setSelectedOption(null);
      setShowFeedback(false);
      setScore(0);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.quizPage}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ textAlign: "center", marginTop: 8 }}>Loading Quiz...</Text>
      </View>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>⚠️ No questions available</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (opt) => {
    if (showFeedback) return;
    setSelectedOption(opt);
    const correct = opt.isCorrect === true || opt === currentQuestion.correct || opt.text === currentQuestion.correct;
    // Note: support both shapes: { text, isCorrect } or options as array of strings with `correct` property on question
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    // reveal feedback if user tapped next without selecting an answer
    if (!showFeedback) {
      setShowFeedback(true);
      return;
    }

    // move to next or finish
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      return;
    }

    // finished quiz: compute earned points, save points & history
    const earnedPoints = score * POINTS_PER_CORRECT;
    const entry = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
      earnedPoints,
    };

    // save attempt & add points (both try Firestore first, fallback handled)
    await saveQuizAttemptForUser(entry);
    const newTotal = await addLeafPointsForUser(earnedPoints);

    Alert.alert(
      "Quiz Finished!",
      `You scored ${score} / ${questions.length}\n+${earnedPoints} Leaf Points\nTotal: ${newTotal ?? "—"}`,
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("HomeScreenWithQuiz");
          },
        },
      ],
      { cancelable: false }
    );
  };

  // render option text whether stored as objects or strings
  const optionText = (opt) => (typeof opt === "string" ? opt : opt.text ?? String(opt));

  return (
    <View style={styles.quizPage}>
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} / {questions.length}
      </Text>

      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => {
        const text = optionText(opt);
        const isCorrect = typeof opt === "object" ? opt.isCorrect === true : false;
        const selectedMatches = selectedOption && (selectedOption === opt || selectedOption.text === opt.text || selectedOption === text);

        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              showFeedback && isCorrect ? { backgroundColor: "#C8E6C9" } : null,
              showFeedback && selectedMatches && !isCorrect ? { backgroundColor: "#FFCDD2" } : null,
            ]}
            onPress={() => handleOptionPress(opt)}
          >
            <Text style={styles.optionText}>{text}</Text>
          </TouchableOpacity>
        );
      })}

      {/** Next/Finish button */}
      {showFeedback && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentIndex + 1 === questions.length ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ------------------------
// Score History Screen
// ------------------------
export function ScoreHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const h = await fetchQuizHistoryForUser();
      // sort newest-first by date (if present)
      h.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
      setHistory(h);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.historyContainer}>
        <ActivityIndicator size="small" color="#2E7D32" />
      </View>
    );
  }

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      {history.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{item.date ? new Date(item.date).toLocaleString() : "Unknown date"}</Text>
              <Text>
                {item.score}/{item.total} (+{item.earnedPoints ?? 0} pts)
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ------------------------
// Shop Screen (with Inventory Integration)
// ------------------------
export function ShopScreen({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);

  const items = [
    { id: "1", name: "Water", icon: "💧", cost: 10, desc: "Hydrate your plants to keep them fresh" },
    { id: "2", name: "Fertilizer", icon: "🌿", cost: 20, desc: "Boost plant growth and strength" },
    { id: "3", name: "Sunlight", icon: "☀️", cost: 15, desc: "Provide warmth and energy" },
  ];

  useEffect(() => {
    const loadPoints = async () => {
      const pts = await getLeafPointsForUser();
      setLeafPoints(pts);
    };
    const unsub = navigation.addListener("focus", loadPoints);
    loadPoints();
    return unsub;
  }, [navigation]);

  const handlePurchase = async (item) => {
    const res = await spendLeafPointsForUser(item.cost);
    if (res.success) {
      setLeafPoints(res.remaining);
      await addItemToInventory(item);
      Alert.alert("✅ Purchase Successful", `You bought ${item.icon} ${item.name}`);
    } else {
      Alert.alert("❌ Not enough points", `You need ${item.cost} points`);
    }
  };

  const addItemToInventory = async (item) => {
    try {
      const stored = await AsyncStorage.getItem("userInventory");
      const inventory = stored ? JSON.parse(stored) : [];
      inventory.push({ name: item.name, icon: item.icon });
      await AsyncStorage.setItem("userInventory", JSON.stringify(inventory));
    } catch (e) {
      console.log("Error saving to inventory:", e);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.shopCard}
      onPress={() => handlePurchase(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.shopIcon}>{item.icon}</Text>
      <Text style={styles.shopItemTitle}>{item.desc}</Text>
      <View style={styles.shopCostTag}>
        <Ionicons name="leaf-outline" size={14} color="#2E7D32" />
        <Text style={styles.shopCostText}>{item.cost}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.shopContainer}>
      <Text style={styles.quizTitle}>🛒 LeafQuest Shop</Text>
      <Text style={styles.pointsDisplay}>
        <Ionicons name="leaf-outline" size={16} color="#2E7D32" />{" "}
        Your Points: <Text style={{ fontWeight: "bold" }}>{leafPoints}</Text>
      </Text>

      <TouchableOpacity
        style={styles.inventoryButton}
        onPress={() => navigation.navigate("InventoryScreen")}
      >
        <Ionicons name="bag-outline" size={18} color="#fff" />
        <Text style={styles.inventoryButtonText}>View Inventory</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}


// ------------------------
// Inventory Screen
// ------------------------
export function InventoryScreen() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const stored = await AsyncStorage.getItem("userInventory");
        const data = stored ? JSON.parse(stored) : [];
        setInventory(data);
      } catch (e) {
        console.log("Error loading inventory:", e);
      }
    };
    loadInventory();
  }, []);

  return (
    <View style={styles.inventoryContainer}>
      <Text style={styles.quizTitle}>🎒 Inventory</Text>

      {inventory.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No items yet. Buy some from the Shop!</Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View style={styles.inventoryCard}>
              <Text style={styles.shopIcon}>{item.icon}</Text>
              <Text style={styles.shopItemTitle}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ------------------------
// MiniGames Screen (placeholder)
// ------------------------
export function MiniGamesScreen({ navigation }) {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>🎮 Mini-Games</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("TicTacToeScreen")}>
        <Text style={styles.optionText}>Play Tic Tac Toe</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------------
// Navigation Stack
// ------------------------
const Stack = createNativeStackNavigator();

export default function QuizFeatureStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreenWithQuiz" component={HomeScreenWithQuiz} options={{ title: "Home" }} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: "Quiz" }} />
      <Stack.Screen name="ScoreHistoryScreen" component={ScoreHistoryScreen} options={{ title: "Score History" }} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} options={{ title: "Shop" }} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} options={{ title: "Inventory" }} />
      <Stack.Screen name="MiniGamesScreen" component={MiniGamesScreen} options={{ title: "Mini-Games" }} />
      <Stack.Screen name="TicTacToeScreen" component={TicTacToeScreen} options={{ title: "Tic Tac Toe" }} />
    </Stack.Navigator>
  );
}

// ------------------------
// Styles
// ------------------------
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    paddingTop: 60,
  },
  pointsBadge: {
    position: "absolute",
    top: 36,
    right: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  pointsText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 30,
  },
  buttonColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    gap: 20,
  },
  mainButton: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  mainButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  quizPage: {
    flex: 1,
    backgroundColor: "#DFF0D8",
    justifyContent: "center",
    padding: 20,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1B5E20",
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
    color: "#2E7D32",
    textAlign: "center",
    fontWeight: "bold",
  },
  optionButton: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#388E3C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  historyContainer: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
    shopContainer: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  shopCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  shopIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  shopItemTitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  shopCostTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8E6C9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  shopCostText: {
    marginLeft: 4,
    color: "#2E7D32",
    fontWeight: "bold",
    fontSize: 13,
  },
  pointsDisplay: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
    color: "#1B5E20",
  },

  inventoryContainer: {
  flex: 1,
  backgroundColor: "#E8F5E9",
  padding: 20,
},
inventoryCard: {
  flex: 1,
  margin: 8,
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 15,
  alignItems: "center",
  justifyContent: "center",
  elevation: 3,
},
inventoryButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2E7D32",
  borderRadius: 12,
  padding: 10,
  marginVertical: 10,
  alignSelf: "center",
  width: "60%",
  elevation: 3,
},
inventoryButtonText: {
  color: "#fff",
  fontWeight: "bold",
  marginLeft: 8,
},

});
