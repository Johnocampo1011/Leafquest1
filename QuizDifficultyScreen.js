// QuizFeature.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebaseAdminConfig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import TicTacToeScreen from "./TicTacToeScreen";

// --- TEMP userId until Firebase Auth is added ---
const userId = "demoUser";

// --- Firestore Helpers ---
async function getLeafPoints() {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data().leafPoints || 0;
    } else {
      await setDoc(userRef, { leafPoints: 0, history: [] });
      return 0;
    }
  } catch (err) {
    console.error("Error getting points:", err);
    return 0;
  }
}

async function addLeafPoints(points) {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    let current = 0;
    if (snap.exists()) {
      current = snap.data().leafPoints || 0;
    }
    const updated = current + points;

    await updateDoc(userRef, {
      leafPoints: updated,
      history: arrayUnion({
        type: "earn",
        points,
        date: new Date().toISOString(),
      }),
    });

    return updated;
  } catch (err) {
    console.error("Error adding points:", err);
    return 0;
  }
}

async function spendLeafPoints(cost) {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return { success: false, remaining: 0 };

    const current = snap.data().leafPoints || 0;
    if (current >= cost) {
      const updated = current - cost;
      await updateDoc(userRef, {
        leafPoints: updated,
        history: arrayUnion({
          type: "spend",
          cost,
          date: new Date().toISOString(),
        }),
      });
      return { success: true, remaining: updated };
    } else {
      return { success: false, remaining: current };
    }
  } catch (err) {
    console.error("Error spending points:", err);
    return { success: false, remaining: 0 };
  }
}

async function getHistory() {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data().history || [];
    }
    return [];
  } catch (err) {
    console.error("Error getting history:", err);
    return [];
  }
}

// --- Home Screen ---
export function HomeScreenWithQuiz({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);

  useEffect(() => {
    const loadPoints = async () => {
      const points = await getLeafPoints();
      setLeafPoints(points);
    };
    const unsubscribe = navigation.addListener("focus", loadPoints);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.topBar}>
        <Text style={styles.title}>🌱 Welcome to LeafQuest!</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="leaf-outline" size={20} color="#2E7D32" />
          <Text style={styles.pointsText}>{leafPoints}</Text>
        </View>
      </View>

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

// --- Shop Screen ---
export function ShopScreen({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);

  const items = [
    { id: "1", name: "💧 Water", cost: 10 },
    { id: "2", name: "🌿 Fertilizer", cost: 20 },
    { id: "3", name: "🪴 Spray", cost: 15 },
  ];

  useEffect(() => {
    const loadPoints = async () => {
      const points = await getLeafPoints();
      setLeafPoints(points);
    };
    const unsubscribe = navigation.addListener("focus", loadPoints);
    return unsubscribe;
  }, [navigation]);

  const handlePurchase = async (item) => {
    const result = await spendLeafPoints(item.cost);
    if (result.success) {
      setLeafPoints(result.remaining);
      Alert.alert("Purchase Successful ✅", `You bought ${item.name}`);
    } else {
      Alert.alert("Not enough points ❌", `You need ${item.cost} points`);
    }
  };

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>🛒 Shop</Text>
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Your Points: {leafPoints}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handlePurchase(item)}
          >
            <Text style={styles.optionText}>
              {item.name} - {item.cost} pts
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// --- Quiz Screen (placeholder for now) ---
export function QuizScreen() {
  return (
    <View style={styles.quizPage}>
      <Text style={styles.quizTitle}>🌱 Quiz Feature Coming Soon</Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={async () => {
          await addLeafPoints(5);
          Alert.alert("Congrats!", "You earned 5 Leaf Points 🎉");
        }}
      >
        <Text style={styles.nextButtonText}>Simulate Earn Points</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Score History Screen ---
export function ScoreHistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const records = await getHistory();
      setHistory(records.reverse()); // newest first
    };
    loadHistory();
  }, []);

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>
              {item.type === "earn"
                ? `+${item.points} pts`
                : `-${item.cost} pts`}
            </Text>
            <Text style={{ color: "#555" }}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No history yet.
          </Text>
        }
      />
    </View>
  );
}

// --- MiniGames Screen (placeholder) ---
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

// --- Navigation ---
const Stack = createNativeStackNavigator();

export default function QuizFeatureStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreenWithQuiz"
        component={HomeScreenWithQuiz}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ title: "Quiz" }}
      />
      <Stack.Screen
        name="ScoreHistoryScreen"
        component={ScoreHistoryScreen}
        options={{ title: "Score History" }}
      />
      <Stack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{ title: "Shop" }}
      />
      <Stack.Screen
        name="MiniGamesScreen"
        component={MiniGamesScreen}
        options={{ title: "Mini-Games" }}
      />
      <Stack.Screen
        name="TicTacToeScreen"
        component={TicTacToeScreen}
        options={{ title: "Tic Tac Toe" }}
      />
    </Stack.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    paddingTop: 60,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8E6C9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 6,
    color: "#2E7D32",
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
});

