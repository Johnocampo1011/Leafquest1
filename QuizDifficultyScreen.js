// QuizDifficultyScreen.js
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

import { fetchQuestions } from "./quizData";
import TicTacToeScreen from "./TicTacToeScreen";

// Firestore helpers
import {
  getLeafPointsForUser,
  addLeafPointsForUser,
  spendLeafPointsForUser,
  saveQuizAttemptForUser,
  fetchQuizHistoryForUser,
} from "./userData";

const POINTS_PER_CORRECT = 5;

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
      <View style={styles.pointsBadge}>
        <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
        <Text style={styles.pointsText}>
          {loadingPoints ? "…" : leafPoints}
        </Text>
      </View>

      <Text style={styles.title}>🌱 Welcome to LeafQuest!</Text>

      <View style={styles.buttonColumn}>
        <MainButton
          title="Start Quiz"
          color="#388E3C"
          icon="play-circle-outline"
          onPress={() => navigation.navigate("QuizScreen")}
        />
        <MainButton
          title="History"
          color="#6D4C41"
          icon="time-outline"
          onPress={() => navigation.navigate("ScoreHistoryScreen")}
        />
        <MainButton
          title="Shop"
          color="#00796B"
          icon="cart-outline"
          onPress={() => navigation.navigate("ShopScreen")}
        />
        <MainButton
          title="Inventory"
          color="#4CAF50"
          icon="bag-outline"
          onPress={() => navigation.navigate("InventoryScreen")}
        />
        <MainButton
          title="Mini-Games"
          color="#8E44AD"
          icon="game-controller-outline"
          onPress={() => navigation.navigate("MiniGamesScreen")}
        />
      </View>
    </View>
  );
}

function MainButton({ title, color, icon, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.mainButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={22} color="#fff" />
      <Text style={styles.mainButtonText}>{title}</Text>
    </TouchableOpacity>
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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchQuestions(10);
      setQuestions(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <View style={styles.quizPage}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ textAlign: "center", marginTop: 8 }}>Loading Quiz...</Text>
      </View>
    );

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (opt) => {
    if (showFeedback) return;
    setSelectedOption(opt);
    const correct =
      opt.isCorrect === true ||
      opt === currentQuestion.correct ||
      opt.text === currentQuestion.correct;
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      return;
    }

    const earnedPoints = score * POINTS_PER_CORRECT;
    const entry = {
      date: new Date().toISOString(),
      score,
      total: questions.length,
      earnedPoints,
    };

    await saveQuizAttemptForUser(entry);
    const newTotal = await addLeafPointsForUser(earnedPoints);

    Alert.alert(
      "Quiz Finished!",
      `You scored ${score}/${questions.length}\n+${earnedPoints} Leaf Points\nTotal: ${newTotal ?? "—"}`,
      [{ text: "OK", onPress: () => navigation.navigate("HomeScreenWithQuiz") }]
    );
  };

  return (
    <View style={styles.quizPage}>
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} / {questions.length}
      </Text>

      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => (
        <TouchableOpacity
          key={idx}
          style={[
            styles.optionButton,
            showFeedback && opt.isCorrect && { backgroundColor: "#C8E6C9" },
            showFeedback &&
              selectedOption === opt &&
              !opt.isCorrect && { backgroundColor: "#FFCDD2" },
          ]}
          onPress={() => handleOptionPress(opt)}
        >
          <Text style={styles.optionText}>
            {typeof opt === "string" ? opt : opt.text}
          </Text>
        </TouchableOpacity>
      ))}

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

  useEffect(() => {
    const load = async () => {
      const h = await fetchQuizHistoryForUser();
      h.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(h);
    };
    load();
  }, []);

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      {history.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{new Date(item.date).toLocaleString()}</Text>
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
// Shop Screen
// ------------------------
export function ShopScreen({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);
  const items = [
    { id: "1", name: "Water", icon: "💧", cost: 10, desc: "Hydrate your plants" },
    { id: "2", name: "Fertilizer", icon: "🌿", cost: 20, desc: "Boost growth" },
    { id: "3", name: "Sunlight", icon: "☀️", cost: 15, desc: "Give energy" },
  ];

  useEffect(() => {
    const loadPoints = async () => {
      const pts = await getLeafPointsForUser();
      setLeafPoints(pts);
    };
    loadPoints();
  }, []);

  const addItemToInventory = async (item) => {
    try {
      const stored = await AsyncStorage.getItem("userInventory");
      const inventory = stored ? JSON.parse(stored) : [];
      const existing = inventory.find((i) => i.name === item.name);
      if (existing) existing.quantity += 1;
      else inventory.push({ name: item.name, icon: item.icon, quantity: 1 });
      await AsyncStorage.setItem("userInventory", JSON.stringify(inventory));
    } catch (e) {
      console.log("Error saving inventory:", e);
    }
  };

  const handlePurchase = async (item) => {
    const res = await spendLeafPointsForUser(item.cost);
    if (!res.success) {
      Alert.alert("❌ Not enough points", `You need ${item.cost} points`);
      return;
    }

    await addItemToInventory(item);
    setLeafPoints(res.remaining);
    Alert.alert("✅ Purchased", `You bought ${item.icon} ${item.name}`);
  };

  return (
    <View style={styles.shopContainer}>
      <Text style={styles.quizTitle}>🛒 LeafQuest Shop</Text>
      <Text style={styles.pointsDisplay}>
        <Ionicons name="leaf-outline" size={16} color="#2E7D32" /> Your Points:{" "}
        <Text style={{ fontWeight: "bold" }}>{leafPoints}</Text>
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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shopCard}
            onPress={() => handlePurchase(item)}
          >
            <Text style={styles.shopIcon}>{item.icon}</Text>
            <Text style={styles.shopItemTitle}>{item.desc}</Text>
            <View style={styles.shopCostTag}>
              <Ionicons name="leaf-outline" size={14} color="#2E7D32" />
              <Text style={styles.shopCostText}>{item.cost}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

// ------------------------
// Inventory Screen (Grid)
// ------------------------
export function InventoryScreen() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = async () => {
      const stored = await AsyncStorage.getItem("userInventory");
      const data = stored ? JSON.parse(stored) : [];
      setInventory(data);
    };
    loadInventory();
  }, []);

  return (
    <View style={styles.inventoryContainer}>
      <Text style={styles.quizTitle}>🎒 Inventory</Text>
      {inventory.length === 0 ? (
        <Text style={{ textAlign: "center" }}>
          No items yet. Buy some from the Shop!
        </Text>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(item, i) => i.toString()}
          numColumns={2}
          columnWrapperStyle={styles.inventoryRow}
          renderItem={({ item }) => (
            <View style={styles.inventoryCard}>
              <Text style={styles.inventoryIcon}>{item.icon}</Text>
              <Text style={styles.inventoryName}>
                {item.name} {item.quantity > 1 ? `×${item.quantity}` : ""}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ------------------------
// Mini Games
// ------------------------
export function MiniGamesScreen({ navigation }) {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>🎮 Mini-Games</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("TicTacToeScreen")}
      >
        <Text style={styles.optionText}>Play Tic Tac Toe</Text>
      </TouchableOpacity>
    </View>
  );
}

// ------------------------
// Stack Navigation
// ------------------------
const Stack = createNativeStackNavigator();
export default function QuizFeatureStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreenWithQuiz" component={HomeScreenWithQuiz} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ScoreHistoryScreen" component={ScoreHistoryScreen} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="MiniGamesScreen" component={MiniGamesScreen} />
      <Stack.Screen name="TicTacToeScreen" component={TicTacToeScreen} />
    </Stack.Navigator>
  );
}

// ------------------------
// Styles
// ------------------------
const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: "#E8F5E9", alignItems: "center", paddingTop: 60 },
  pointsBadge: { position: "absolute", top: 36, right: 18, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, flexDirection: "row", alignItems: "center", elevation: 3 },
  pointsText: { marginLeft: 6, fontSize: 14, fontWeight: "bold", color: "#2E7D32" },
  title: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", marginBottom: 30 },
  buttonColumn: { flexDirection: "column", alignItems: "center", width: "80%", gap: 20 },
  mainButton: { flexDirection: "row", width: "100%", paddingVertical: 15, borderRadius: 12, alignItems: "center", justifyContent: "center", elevation: 3 },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 8 },

  quizPage: { flex: 1, backgroundColor: "#DFF0D8", justifyContent: "center", padding: 20 },
  quizTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1B5E20" },
  questionCount: { fontSize: 16, color: "#2E7D32", textAlign: "center", fontWeight: "bold", marginBottom: 10 },
  optionButton: { flexDirection: "row", padding: 15, borderRadius: 12, borderWidth: 1, borderColor: "#4CAF50", marginBottom: 15, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  optionText: { fontSize: 18, fontWeight: "500", color: "#000" },
  nextButton: { marginTop: 20, backgroundColor: "#388E3C", padding: 15, borderRadius: 12, alignItems: "center" },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  historyContainer: { flex: 1, padding: 20 },
  historyItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" },

  shopContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  row: { justifyContent: "space-between", marginBottom: 15 },
  shopCard: { backgroundColor: "#fff", borderRadius: 16, padding: 15, width: "48%", alignItems: "center", elevation: 4 },
  shopIcon: { fontSize: 36, marginBottom: 8 },
  shopItemTitle: { fontSize: 13, textAlign: "center", color: "#333", marginBottom: 10 },
  shopCostTag: { flexDirection: "row", alignItems: "center", backgroundColor: "#C8E6C9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  shopCostText: { marginLeft: 4, color: "#2E7D32", fontWeight: "bold", fontSize: 13 },
  pointsDisplay: { textAlign: "center", marginBottom: 20, fontSize: 16, color: "#1B5E20" },

  inventoryContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  inventoryRow: { justifyContent: "space-between", marginBottom: 15 },
  inventoryCard: { backgroundColor: "#fff", borderRadius: 16, paddingVertical: 25, width: "48%", alignItems: "center", elevation: 4 },
  inventoryIcon: { fontSize: 40, marginBottom: 10 },
  inventoryName: { fontSize: 15, fontWeight: "600", color: "#2E7D32", textAlign: "center" },
  inventoryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2E7D32", borderRadius: 12, padding: 10, marginVertical: 10, alignSelf: "center", width: "60%" },
  inventoryButtonText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
});
