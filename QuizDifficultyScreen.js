// QuizDifficultyScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import TicTacToeModeScreen from "./TicTacToeModeScreen";
import TicTacToeAIScreen from "./TicTacToeAIScreen";
import TicTacToeScreen from "./TicTacToeScreen";

import { fetchQuestions } from "./quizData";

// Firestore helpers + low-level firestore
import {
  getLeafPointsForUser,
  addLeafPointsForUser,
  spendLeafPointsForUser,
  saveQuizAttemptForUser,
  fetchQuizHistoryForUser,
} from "./userData";

import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig";

const POINTS_PER_CORRECT = 5;

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ---------------------------------------------
// Reusable Animated Button component
// ---------------------------------------------
function AnimatedButton({ title, color, icon, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 6, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], width: "100%" }}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.mainButton, { backgroundColor: color }]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Ionicons name={icon} size={22} color="#fff" />
        <Text style={styles.mainButtonText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ---------------------------------------------
// Small popup modal (used for success / info)
// ---------------------------------------------
function InfoModal({ visible, title, message, onClose, autoDismissMs = 2000 }) {
  useEffect(() => {
    let t;
    if (visible && autoDismissMs > 0) {
      t = setTimeout(() => {
        onClose?.();
      }, autoDismissMs);
    }
    return () => clearTimeout(t);
  }, [visible, autoDismissMs]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <Animated.View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalMessage}>{message}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
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
      <View style={styles.pointsBadge}>
        <Ionicons name="leaf-outline" size={18} color="#2E7D32" />
        <Text style={styles.pointsText}>{loadingPoints ? "…" : leafPoints}</Text>
      </View>

      <Text style={styles.title}>🌱 Welcome to LeafQuest!</Text>

      <View style={styles.buttonColumn}>
        <AnimatedButton
          title="Start Quiz"
          color="#388E3C"
          icon="play-circle-outline"
          onPress={() => navigation.navigate("QuizScreen")}
        />
        <AnimatedButton
          title="History"
          color="#6D4C41"
          icon="time-outline"
          onPress={() => navigation.navigate("ScoreHistoryScreen")}
        />
        <AnimatedButton
          title="Shop"
          color="#00796B"
          icon="cart-outline"
          onPress={() => navigation.navigate("ShopScreen")}
        />
        <AnimatedButton
          title="Inventory"
          color="#4CAF50"
          icon="bag-outline"
          onPress={() => navigation.navigate("InventoryScreen")}
        />
        <AnimatedButton
          title="Mini-Games"
          color="#8E44AD"
          icon="game-controller-outline"
          onPress={() => navigation.navigate("MiniGamesScreen")}
        />
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
  const [exitModalVisible, setExitModalVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const data = await fetchQuestions(10);
      if (!mounted) return;
      setQuestions(data);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // intercept hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setExitModalVisible(true);
        return true; // prevent default
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

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
    const correct = opt.isCorrect === true || opt === currentQuestion.correct || opt.text === currentQuestion.correct;
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (!showFeedback) {
      setShowFeedback(true);
      return;
    }

    if (currentIndex + 1 < questions.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentIndex((c) => c + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      return;
    }

    // finished: apply tiered scoring
    let earnedPoints = 0;
    if (score >= 10) earnedPoints = 10;
    else if (score >= 5) earnedPoints = 5;
    else if (score >= 3) earnedPoints = 1;
    else earnedPoints = 0;

    const entry = { date: new Date().toISOString(), score, total: questions.length, earnedPoints };

    await saveQuizAttemptForUser(entry);
    const newTotal = await addLeafPointsForUser(earnedPoints);

    Alert.alert("Quiz Finished!", `You scored ${score}/${questions.length}\n+${earnedPoints} Leaf Points\nTotal: ${newTotal ?? "—"}`, [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  };

  return (
    <View style={styles.quizPage}>
      <InfoModal
        visible={exitModalVisible}
        title="Exit Quiz?"
        message="Are you sure? Progress won't be saved."
        onClose={() => setExitModalVisible(false)}
        autoDismissMs={0}
      />
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} / {questions.length}
      </Text>

      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => {
        const isCorrect = typeof opt === "object" ? opt.isCorrect === true : false;
        const selectedMatches =
          selectedOption && (selectedOption === opt || selectedOption.text === opt.text || selectedOption === (typeof opt === "string" ? opt : opt.text));
        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              showFeedback && isCorrect ? { backgroundColor: "#C8E6C9" } : null,
              showFeedback && selectedMatches && !isCorrect ? { backgroundColor: "#FFCDD2" } : null,
            ]}
            onPress={() => handleOptionPress(opt)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionText}>{typeof opt === "string" ? opt : opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{currentIndex + 1 === questions.length ? "Finish" : "Next"}</Text>
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
      h.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHistory(h);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <View style={styles.historyContainer}><ActivityIndicator /></View>;

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
// Shop Screen (animated cards + save to Firestore)
// ------------------------
export function ShopScreen({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState({ title: "", message: "" });
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    const unsub = navigation.addListener("focus", loadPoints);
    loadPoints();
    Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
    return unsub;
  }, [navigation]);

  // Save item into user's inventory array in Firestore (merging quantities)
  const saveItemToFirestore = async (item) => {
    const user = getAuth().currentUser;
    if (!user) throw new Error("Not signed in");

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const userData = snap.data();
      const inventory = Array.isArray(userData.inventory) ? [...userData.inventory] : [];
      const idx = inventory.findIndex((i) => i.name === item.name);
      if (idx >= 0) {
        inventory[idx].quantity = (inventory[idx].quantity || 0) + 1;
      } else {
        inventory.push({ name: item.name, icon: item.icon, quantity: 1 });
      }
      await updateDoc(userRef, { inventory });
    } else {
      await setDoc(userRef, { inventory: [{ name: item.name, icon: item.icon, quantity: 1 }] });
    }
  };

  const handlePurchase = async (item) => {
    try {
      const res = await spendLeafPointsForUser(item.cost);
      if (!res.success) {
        setModalMsg({ title: "Not enough points", message: `You need ${item.cost} points` });
        setModalVisible(true);
        return;
      }

      // try to save to firestore
      await saveItemToFirestore(item);

      // success: animate + update points badge and show modal
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setLeafPoints(res.remaining);
      setModalMsg({ title: "Purchase Successful ✅", message: `You bought ${item.icon} ${item.name}` });
      setModalVisible(true);
    } catch (err) {
      console.error("Purchase/save error:", err);
      setModalMsg({ title: "Error", message: "Could not complete purchase. Try again." });
      setModalVisible(true);
    }
  };

  const renderCard = ({ item, index }) => {
    const cardFade = new Animated.Value(0);
    Animated.timing(cardFade, { toValue: 1, duration: 300 + index * 80, useNativeDriver: true }).start();

    return (
      <Animated.View style={[styles.shopCard, { opacity: cardFade }]}>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => handlePurchase(item)} activeOpacity={0.85}>
          <Text style={styles.shopIcon}>{item.icon}</Text>
          <Text style={styles.shopItemTitle}>{item.desc}</Text>
          <View style={styles.shopCostTag}>
            <Ionicons name="leaf-outline" size={14} color="#2E7D32" />
            <Text style={styles.shopCostText}>{item.cost}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.shopContainer}>
      <InfoModal visible={modalVisible} title={modalMsg.title} message={modalMsg.message} onClose={() => setModalVisible(false)} />
      <Text style={styles.quizTitle}>🛒 LeafQuest Shop</Text>

      <Text style={styles.pointsDisplay}>
        <Ionicons name="leaf-outline" size={16} color="#2E7D32" /> Your Points: <Text style={{ fontWeight: "bold" }}>{leafPoints}</Text>
      </Text>

      <TouchableOpacity style={styles.inventoryButton} onPress={() => navigation.navigate("InventoryScreen")}>
        <Ionicons name="bag-outline" size={18} color="#fff" />
        <Text style={styles.inventoryButtonText}>View Inventory</Text>
      </TouchableOpacity>

      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderCard}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </Animated.View>
    </View>
  );
}

// ------------------------
// Inventory Screen (reads inventory array on user doc)
// ------------------------
export function InventoryScreen() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadInventory = async () => {
      try {
        setLoading(true);
        const user = getAuth().currentUser;
        if (!user) {
          setInventory([]);
          setLoading(false);
          return;
        }
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setInventory(Array.isArray(data.inventory) ? data.inventory : []);
        } else {
          setInventory([]);
        }
      } catch (err) {
        console.error("Error loading inventory:", err);
        setInventory([]);
      } finally {
        Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        setLoading(false);
      }
    };

    const unsubFocus = () => {}; // placeholder

    loadInventory();
    // Re-load when screen focuses
    // Note: use navigation listener if you want automatic refresh when returning from Shop
    return unsubFocus;
  }, []);

  if (loading) {
    return (
      <View style={styles.inventoryContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.inventoryContainer}>
      <Text style={styles.quizTitle}>🎒 Inventory</Text>

      {inventory.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No items yet. Buy some from the Shop!</Text>
      ) : (
        <Animated.View style={{ opacity: fade, flex: 1 }}>
          <FlatList
            data={inventory}
            keyExtractor={(item, i) => i.toString()}
            numColumns={2}
            columnWrapperStyle={styles.inventoryRow}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View style={styles.inventoryCard}>
                <Text style={styles.inventoryIcon}>{item.icon}</Text>
                <Text style={styles.inventoryName}>
                  {item.name} {item.quantity > 1 ? `×${item.quantity}` : ""}
                </Text>
              </View>
            )}
          />
        </Animated.View>
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
      <AnimatedButton title="Play Tic Tac Toe" color="#43A047" icon="play" onPress={() => navigation.navigate("TicTacToeModeScreen")} />
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
      <Stack.Screen name="Home" component={HomeScreenWithQuiz} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ScoreHistoryScreen" component={ScoreHistoryScreen} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} />
      <Stack.Screen name="MiniGamesScreen" component={MiniGamesScreen} />
      <Stack.Screen name="TicTacToeScreen" component={TicTacToeScreen} />
      <Stack.Screen name="TicTacToeModeScreen" component={TicTacToeModeScreen} options={{ title: "Select Mode" }} />
      <Stack.Screen name="TicTacToeAIScreen" component={TicTacToeAIScreen} options={{ title: "Tic Tac Toe (AI)" }} />
    </Stack.Navigator>
  );
}

// ------------------------
// Styles
// ------------------------
const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: "#E8F5E9", alignItems: "center", paddingTop: 60 },
  pointsBadge: {
    position: "absolute",
    top: 36,
    right: 18,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  pointsText: { marginLeft: 6, fontSize: 14, fontWeight: "bold", color: "#2E7D32" },
  title: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", marginBottom: 30 },
  buttonColumn: { flexDirection: "column", alignItems: "center", width: "80%", justifyContent: "center", gap: 18,},
  mainButton: { flexDirection: "row", width: "100%", paddingVertical: 18, borderRadius: 14, alignItems: "center", justifyContent: "center", elevation: 3, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, },
  mainButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 8, },

  // quiz styles
  quizPage: { flex: 1, backgroundColor: "#DFF0D8", justifyContent: "center", padding: 20 },
  quizTitle: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#1B5E20" },
  questionCount: { fontSize: 16, color: "#2E7D32", textAlign: "center", fontWeight: "bold", marginBottom: 10 },
  optionButton: { flexDirection: "row", padding: 15, borderRadius: 12, borderWidth: 1, borderColor: "#4CAF50", marginBottom: 15, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  optionText: { fontSize: 18, fontWeight: "500", color: "#000" },
  nextButton: { marginTop: 20, backgroundColor: "#388E3C", padding: 15, borderRadius: 12, alignItems: "center", elevation: 3 },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // history styles
  historyContainer: { flex: 1, padding: 20 },
  historyItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ccc" },

  // shop styles
  shopContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  row: { justifyContent: "space-between", marginBottom: 15 },
  shopCard: { backgroundColor: "#fff", borderRadius: 16, padding: 15, width: "48%", alignItems: "center", justifyContent: "center", elevation: 4 },
  shopIcon: { fontSize: 36, marginBottom: 8 },
  shopItemTitle: { fontSize: 13, textAlign: "center", color: "#333", marginBottom: 10 },
  shopCostTag: { flexDirection: "row", alignItems: "center", backgroundColor: "#C8E6C9", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  shopCostText: { marginLeft: 4, color: "#2E7D32", fontWeight: "bold", fontSize: 13 },
  pointsDisplay: { textAlign: "center", marginBottom: 12, fontSize: 16, color: "#1B5E20" },

  inventoryContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  inventoryRow: { justifyContent: "space-between", marginBottom: 15 },
  inventoryCard: { backgroundColor: "#fff", borderRadius: 16, paddingVertical: 25, width: "48%", alignItems: "center", justifyContent: "center", elevation: 4 },
  inventoryIcon: { fontSize: 40, marginBottom: 10 },
  inventoryName: { fontSize: 15, fontWeight: "600", color: "#2E7D32", textAlign: "center" },
  inventoryButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#2E7D32", borderRadius: 12, padding: 10, marginVertical: 10, alignSelf: "center", width: "60%", elevation: 3 },
  inventoryButtonText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },

  // modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalCard: { width: "90%", backgroundColor: "#fff", borderRadius: 12, padding: 18, alignItems: "center", elevation: 8 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  modalMessage: { fontSize: 14, color: "#444", textAlign: "center" },
});

