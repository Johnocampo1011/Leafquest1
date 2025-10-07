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

import { fetchQuestions } from "./quizData";
import TicTacToeScreen from "./TicTacToeScreen";

// 🌿 Import all Firestore-linked helpers from userData.js
import {
  getLeafPointsForUser,
  addLeafPointsForUser,
  spendLeafPointsForUser,
  saveQuizAttemptForUser,
  fetchQuizHistoryForUser,
  fetchInventory,
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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchQuestions(10);
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

  if (loading)
    return (
      <View style={styles.quizPage}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ textAlign: "center", marginTop: 8 }}>Loading Quiz...</Text>
      </View>
    );

  if (!questions || questions.length === 0)
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>⚠️ No questions available</Text>
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
    if (!showFeedback) {
      setShowFeedback(true);
      return;
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      return;
    }

    // quiz finished
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
      [{ text: "OK", onPress: () => navigation.navigate("HomeScreenWithQuiz") }],
      { cancelable: false }
    );
  };

  const optionText = (opt) =>
    typeof opt === "string" ? opt : opt.text ?? String(opt);

  return (
    <View style={styles.quizPage}>
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} / {questions.length}
      </Text>

      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => {
        const text = optionText(opt);
        const isCorrect =
          typeof opt === "object" ? opt.isCorrect === true : false;
        const selectedMatches =
          selectedOption &&
          (selectedOption === opt ||
            selectedOption.text === opt.text ||
            selectedOption === text);

        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              showFeedback && isCorrect
                ? { backgroundColor: "#C8E6C9" }
                : null,
              showFeedback && selectedMatches && !isCorrect
                ? { backgroundColor: "#FFCDD2" }
                : null,
            ]}
            onPress={() => handleOptionPress(opt)}
          >
            <Text style={styles.optionText}>{text}</Text>
          </TouchableOpacity>
        );
      })}

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
      h.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setHistory(h);
      setLoading(false);
    };
    load();
  }, []);

  if (loading)
    return (
      <View style={styles.historyContainer}>
        <ActivityIndicator size="small" color="#2E7D32" />
      </View>
    );

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
              <Text>
                {item.date
                  ? new Date(item.date).toLocaleString()
                  : "Unknown date"}
              </Text>
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

  // 🧩 Updated purchase logic (deducts points only if inventory update succeeds)
  const handlePurchase = async (item) => {
    const res = await spendLeafPointsForUser(item.cost);
    if (!res.success) {
      Alert.alert("❌ Not enough points", `You need ${item.cost} points`);
      return;
    }

    try {
      await addItemToInventory(item);
      setLeafPoints(res.remaining);
      Alert.alert("✅ Purchase Successful", `You bought ${item.icon} ${item.name}`);
    } catch (error) {
      Alert.alert("⚠️ Error", "Purchase failed to save in inventory.");
      console.error(error);
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
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );

// ------------------------
// Inventory Screen (Improved Grid UI)
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

  const renderItem = ({ item }) => (
  <View style={styles.inventoryCard}>
    <Text style={styles.inventoryIcon}>{item.icon}</Text>
    <Text style={styles.inventoryName}>
      {item.name} {item.quantity > 1 ? `×${item.quantity}` : ""}
    </Text>
  </View>
);


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
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.inventoryRow}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}


// ------------------------
// Inventory Screen (Improved Grid UI)
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

  const renderItem = ({ item }) => (
  <View style={styles.inventoryCard}>
    <Text style={styles.inventoryIcon}>{item.icon}</Text>
    <Text style={styles.inventoryName}>
      {item.name} {item.quantity > 1 ? `×${item.quantity}` : ""}
    </Text>
  </View>
);


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
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.inventoryRow}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

// ------------------------
// MiniGames
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
// Navigation
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

  // quiz styles
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

  // quiz styles 2
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

  // history styles
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

  // shop styles
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

// ------------------------
// Inventory Styles (Grid Layout)
// ------------------------
inventoryContainer: {
  flex: 1,
  backgroundColor: "#E8F5E9",
  padding: 20,
},

inventoryRow: {
  justifyContent: "space-between",
  marginBottom: 15,
},

inventoryCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingVertical: 25,
  width: "48%",
  alignItems: "center",
  justifyContent: "center",
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
},

inventoryIcon: {
  fontSize: 40,
  marginBottom: 10,
},

inventoryName: {
  fontSize: 15,
  fontWeight: "600",
  color: "#2E7D32",
  textAlign: "center",
  marginTop: 6,
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
