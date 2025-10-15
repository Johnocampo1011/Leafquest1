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
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { fetchQuestions } from "./quizData";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true);

// ----------------------
// Firestore helper functions
// ----------------------
async function getUserRef() {
  const user = getAuth().currentUser;
  if (!user) throw new Error("No user logged in");
  return doc(db, "users", user.uid);
}

async function getUserData() {
  const ref = await getUserRef();
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : {};
}

async function updateUserData(data) {
  const ref = await getUserRef();
  await setDoc(ref, data, { merge: true });
}

// ----------------------
// Animated Button
// ----------------------
function AnimatedButton({ title, color, icon, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    setTimeout(onPress, 120);
  };

  return (
    <TouchableWithoutFeedback onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[styles.mainButton, { backgroundColor: color, transform: [{ scale }] }]}>
        <Ionicons name={icon} size={22} color="#fff" />
        <Text style={styles.mainButtonText}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ----------------------
// Home Menu
// ----------------------
export function HomeScreenWithQuiz({ navigation }) {
  const [leafPoints, setLeafPoints] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const user = await getUserData();
          setLeafPoints(user.leafPoints || 0);
        } catch (err) {
          console.warn("Error loading points:", err);
        }
      };
      load();
    }, [])
  );

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>🌿 Welcome to LeafQuest</Text>
      <Text style={styles.pointsDisplay}>
        <Ionicons name="leaf-outline" size={18} color="#2E7D32" /> Leaf Points: {leafPoints}
      </Text>

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

// ----------------------
// Quiz Screen
// ----------------------
export function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuestions(10);
        setQuestions(data);
      } catch {
        setQuestions([{ question: "What does a plant need?", options: ["Sunlight", "Juice"], correct: "Sunlight" }]);
      }
      setLoading(false);
    };
    load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
        setExitModalVisible(true);
        return true;
      });
      return () => subscription.remove();
    }, [])
  );

  const handleSelect = (opt) => {
    if (showFeedback) return;
    const q = questions[current];
    const correct = opt === q.correct || opt.text === q.correct || opt.isCorrect;
    setSelected(opt);
    if (correct) setScore((prev) => prev + 1);
    setShowFeedback(true);
  };

  const saveQuizResult = async (earned) => {
    try {
      const user = await getUserData();
      const newHistory = user.scoreHistory || [];
      newHistory.push({
        date: new Date().toISOString(),
        score,
        total: questions.length,
        earned,
      });
      await updateUserData({
        leafPoints: (user.leafPoints || 0) + earned,
        scoreHistory: newHistory,
      });
    } catch (err) {
      console.warn("Failed to save quiz result:", err);
    }
  };

  const nextQuestion = async () => {
    if (current + 1 < questions.length) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowFeedback(false);
      return;
    }

    const earned = score >= 4 ? score : 0;
    await saveQuizResult(earned);

    Alert.alert("Quiz Completed 🌱", `Score: ${score}/${questions.length}\n+${earned} Leaf Points`, [
      { text: "OK", onPress: () => navigation.navigate("Home Menu") },
    ]);
  };

  if (loading)
    return (
      <View style={styles.quizPage}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={{ textAlign: "center", marginTop: 8, color: "#2E7D32" }}>Loading quiz...</Text>
      </View>
    );

  const q = questions[current];
  if (!q) return <Text>No questions found.</Text>;

  return (
    <View style={styles.quizPage}>
      <Modal visible={exitModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Exit Quiz?</Text>
              <Text style={styles.modalMessage}>Your progress will not be saved.</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#C8E6C9", flex: 1, marginRight: 5 }]} onPress={() => setExitModalVisible(false)}>
                  <Text style={{ textAlign: "center", color: "#1B5E20", fontWeight: "bold" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#E57373", flex: 1, marginLeft: 5 }]} onPress={() => navigation.navigate("Home Menu")}>
                  <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.questionCount}>Question {current + 1} / {questions.length}</Text>
      <Text style={styles.quizTitle}>{q.question}</Text>

      {q.options.map((opt, i) => {
        const correct = opt === q.correct || opt.isCorrect;
        const chosen = selected === opt || selected?.text === opt?.text;
        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.optionButton,
              showFeedback && correct && { backgroundColor: "#A5D6A7" },
              showFeedback && chosen && !correct && { backgroundColor: "#FFCDD2" },
            ]}
            onPress={() => handleSelect(opt)}
          >
            <Text style={styles.optionText}>{typeof opt === "string" ? opt : opt.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>{current + 1 === questions.length ? "Finish" : "Next"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ----------------------
// Mini Games (inside same file)
// ----------------------
function MiniGamesScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View style={[styles.historyContainer, { opacity: fadeAnim }]}>
      <Text style={styles.quizTitle}>🎮 Mini-Games Menu</Text>
      <AnimatedButton title="🌱 Play Tic Tac Toe (PVP)" color="#43A047" icon="people-outline" onPress={() => navigation.navigate("TicTacToePVP")} />
      <AnimatedButton title="🤖 Play Tic Tac Toe (AI)" color="#2E7D32" icon="hardware-chip-outline" onPress={() => navigation.navigate("TicTacToeAI")} />
      <AnimatedButton title="⬅️ Back to Menu" color="#6D4C41" icon="home-outline" onPress={() => navigation.navigate("Home Menu")} />
    </Animated.View>
  );
}

// ----------------------
// Stack Navigation
// ----------------------
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
      <Stack.Screen name="MiniGames Menu" component={MiniGamesScreen} />
      <Stack.Screen name="TicTacToeAI" component={require("./TicTacToeAIScreen").default} />
      <Stack.Screen name="TicTacToePVP" component={require("./TicTacToeScreen").default} />
    </Stack.Navigator>
  );
}

// ----------------------
// Styles
// ----------------------
const styles = StyleSheet.create({
  homeContainer: { flex: 1, backgroundColor: "#E8F5E9", alignItems: "center", paddingTop: 60 },
  title: { fontSize: 26, fontWeight: "bold", color: "#2E7D32", marginBottom: 15 },
  pointsDisplay: { fontSize: 16, color: "#1B5E20", marginBottom: 20 },
  buttonColumn: { width: "80%", gap: 14 },
  mainButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 16, borderRadius: 14, marginBottom: 8 },
  mainButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 6 },
  quizPage: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
  quizTitle: { fontSize: 20, fontWeight: "bold", color: "#1B5E20", textAlign: "center", marginVertical: 10 },
  questionCount: { textAlign: "center", color: "#388E3C", fontWeight: "bold", marginBottom: 10 },
  optionButton: { backgroundColor: "#fff", padding: 14, borderRadius: 12, borderWidth: 1, borderColor: "#4CAF50", marginBottom: 10 },
  optionText: { color: "#2E7D32", fontSize: 16, textAlign: "center" },
  nextButton: { backgroundColor: "#2E7D32", padding: 14, borderRadius: 12, marginTop: 15 },
  nextButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalCard: { backgroundColor: "#fff", padding: 20, borderRadius: 12, width: "80%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1B5E20" },
  modalMessage: { fontSize: 14, textAlign: "center", marginTop: 6, color: "#333" },
  historyContainer: { flex: 1, backgroundColor: "#E8F5E9", padding: 20 },
});
