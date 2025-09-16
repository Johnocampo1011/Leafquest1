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
import TicTacToeScreen from "./TicTacToeScreen";
import { fetchQuestions } from "./quizData"; // ✅ use new fetch function

// --- Leaf Points Helpers ---
async function getLeafPoints() {
  try {
    const stored = await AsyncStorage.getItem("leafPoints");
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

async function addLeafPoints(points) {
  try {
    const current = await getLeafPoints();
    const updated = current + points;
    await AsyncStorage.setItem("leafPoints", updated.toString());
    return updated;
  } catch {
    return 0;
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
      {/* Top bar with title + points */}
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
          onPress={() => Alert.alert("Coming Soon", "Shop feature not ready yet!")}
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

// --- Quiz Screen ---
export function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions(10); // ✅ pulls 10 randomized
      setQuestions(data);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  if (loading) {
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>Loading Quiz...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>⚠️ No questions found in Firestore</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option) => {
    if (showFeedback) return;

    setSelectedOption(option.text);
    if (option.isCorrect) setScore((prev) => prev + 1);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      await saveScore(score);
      await addLeafPoints(10); // ✅ reward 10 points after each quiz
      Alert.alert(
        "Quiz Finished!",
        `You scored ${score} out of ${questions.length}\n+10 Leaf Points 🌿`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("HomeScreenWithQuiz"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.quizPage}>
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} / {questions.length}
      </Text>
      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            showFeedback && option.isCorrect
              ? { backgroundColor: "#C8E6C9" }
              : null,
            showFeedback &&
              selectedOption === option.text &&
              !option.isCorrect
              ? { backgroundColor: "#FFCDD2" }
              : null,
          ]}
          onPress={() => handleOptionPress(option)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
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

// --- Save Score ---
async function saveScore(score) {
  try {
    const stored = await AsyncStorage.getItem("quizHistory");
    let history = stored ? JSON.parse(stored) : [];
    const newEntry = { date: new Date().toLocaleString(), score };
    history.push(newEntry);
    await AsyncStorage.setItem("quizHistory", JSON.stringify(history));
  } catch (e) {
    console.log("Error saving score", e);
  }
}

// --- Score History Screen ---
export function ScoreHistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem("quizHistory");
        if (stored) setHistory(JSON.parse(stored));
      } catch (e) {
        console.log("Error loading history", e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      {history.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{item.date}</Text>
              <Text>{item.score} pts</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// --- MiniGames Screen ---
export function MiniGamesScreen({ navigation }) {
  return (
    <View style={styles.quizPage}>
      <Text style={styles.quizTitle}>🎮 Mini-Games</Text>

      <TouchableOpacity
        style={[styles.optionButton, { backgroundColor: "#C8E6C9" }]}
        onPress={() => navigation.navigate("TicTacToeScreen")}
      >
        <Ionicons name="grid-outline" size={20} color="#2E7D32" />
        <Text style={styles.optionText}>Tic Tac Toe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, { backgroundColor: "#E0E0E0" }]}
        onPress={() =>
          Alert.alert("Coming Soon", "This mini-game is under development!")
        }
      >
        <Ionicons name="help-circle-outline" size={20} color="#555" />
        <Text style={styles.optionText}>Coming Soon...</Text>
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
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: "Quiz" }} />
      <Stack.Screen
        name="ScoreHistoryScreen"
        component={ScoreHistoryScreen}
        options={{ title: "Score History" }}
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
});
