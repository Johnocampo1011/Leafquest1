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
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // ✅ Firebase setup

// --- Home Screen ---
export function HomeScreenWithQuiz({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>🌱 Welcome to LeafQuest!</Text>

      {/* Buttons stacked with equal sizing */}
      <View style={styles.buttonColumn}>
        {/* START QUIZ */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#388E3C" }]}
          onPress={() => navigation.navigate("QuizScreen")}
        >
          <Ionicons name="play-circle-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>Start Quiz</Text>
        </TouchableOpacity>

        {/* HISTORY */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#6D4C41" }]}
          onPress={() => navigation.navigate("ScoreHistoryScreen")}
        >
          <Ionicons name="time-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>History</Text>
        </TouchableOpacity>

        {/* SHOP */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#00796B" }]}
          onPress={() =>
            Alert.alert("Coming Soon", "Shop feature not ready yet!")
          }
        >
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.mainButtonText}>Shop</Text>
        </TouchableOpacity>

        {/* MINI-GAMES */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: "#8E44AD" }]}
          onPress={() =>
            Alert.alert("Coming Soon", "Mini-Games will be available soon!")
          }
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizQuestions")); // ✅ your Firestore collection
        const fetched = querySnapshot.docs.map((doc) => doc.data());

        if (fetched.length > 0) {
          const shuffled = [...fetched].sort(() => Math.random() - 0.5);
          setQuestions(shuffled.slice(0, 10)); // pick 10 random
        } else {
          console.log("⚠️ No questions found in Firestore!");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
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

  // --- Handle Next Button ---
  const handleNext = () => {
    if (selectedOption === null) {
      Alert.alert("Select an option first!");
      return;
    }

    let newScore = score;
    if (currentQuestion.options[selectedOption].isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentIndex + 1 < questions.length) {
      // Go to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // Finish quiz
      saveScore(newScore);
      Alert.alert("Quiz Finished!", `You scored ${newScore} / ${questions.length}`, [
        {
          text: "OK",
          onPress: () => {
            setCurrentIndex(0); // reset quiz
            setSelectedOption(null);
            setScore(0);
            navigation.navigate("HomeScreenWithQuiz");
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.quizPage}>
      <Text style={styles.questionCount}>
        Question {currentIndex + 1} of {questions.length}
      </Text>
      <Text style={styles.quizTitle}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => {
        const isSelected = index === selectedOption;
        let backgroundColor = "#fff";

        if (isSelected) {
          backgroundColor = option.isCorrect ? "#4CAF50" : "#F44336";
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor }]}
            onPress={() => setSelectedOption(index)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Save Score ---
async function saveScore(score) {
  try {
    const stored = await AsyncStorage.getItem("quizHistory");
    let history = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) history = parsed;
      } catch (e) {
        history = [];
      }
    }

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
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) setHistory(parsed);
        }
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
    </Stack.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 50,
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
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
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
