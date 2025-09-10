// QuizFeature.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchQuestions } from './quizData'; // ✅ Firebase fetch helper

// --- Home Screen ---
export function HomeScreenWithQuiz({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>🌱 Ready to take a quiz?</Text>

      <View style={styles.buttonColumn}>
        {/* START Button */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: '#388E3C' }]}
          onPress={() => navigation.navigate('QuizSelectionScreen')}
        >
          <Text style={styles.mainButtonText}>START</Text>
        </TouchableOpacity>

        {/* HISTORY Button */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: '#6D4C41', flexDirection: 'row' }]}
          onPress={() => navigation.navigate('ScoreHistoryScreen')}
        >
          <Ionicons name="time-outline" size={20} color="#fff" />
          <Text style={styles.mainButtonText}>History</Text>
        </TouchableOpacity>

        {/* SHOP Button */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: '#00796B', flexDirection: 'row' }]}
          onPress={() => alert('Shop coming soon!')}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.mainButtonText}>Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- Difficulty Selection ---
export function QuizSelectionScreen({ navigation }) {
  return (
    <View style={styles.selectionContainer}>
      <Text style={styles.selectionTitle}>🌿 Choose Your Quiz Difficulty</Text>

      {/* Basic */}
      <TouchableOpacity
        style={[styles.difficultyCard, { backgroundColor: '#C8E6C9' }]}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Basic' })}
      >
        <Ionicons name="leaf-outline" size={28} color="#01bb0aff" />
        <Text style={styles.difficultyText}>🌱 Basic</Text>
      </TouchableOpacity>

      {/* Hard */}
      <TouchableOpacity
        style={[styles.difficultyCard, { backgroundColor: '#A5D6A7' }]}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Hard' })}
      >
        <Ionicons name="flower-outline" size={28} color="#01bb0aff" />
        <Text style={styles.difficultyText}>🌿 Hard</Text>
      </TouchableOpacity>

      {/* Professional */}
      <TouchableOpacity
        style={[styles.difficultyCard, { backgroundColor: '#81C784' }]}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Professional' })}
      >
        <Ionicons name="tree-outline" size={28} color="#004D40" />
        <Text style={styles.difficultyText}>🌳 Professional</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- Quiz Screen ---
export function QuizScreen({ route, navigation }) {
  const { level } = route.params;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionPool = await fetchQuestions(level); // ✅ fetch from Firebase
        if (questionPool && questionPool.length > 0) {
          const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
          setQuestions(shuffled.slice(0, 10)); // pick 10 random questions
        } else {
          Alert.alert("No Questions", "No quiz data found for this difficulty.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error loading questions:", error);
        Alert.alert("Error", "Failed to load quiz data.");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [level]);

  if (loading) {
    return (
      <View style={styles.quizPage}>
        <ActivityIndicator size="large" color="#388E3C" />
        <Text style={styles.quizTitle}>Loading {level} Quiz...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>No questions available.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (index) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (currentQuestion.options[index].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextPress = async () => {
    setSelectedOption(null);
    setShowFeedback(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await saveScore(level, score);
      Alert.alert(
        "Quiz Finished!",
        `You scored ${score} out of ${questions.length}`,
        [{ text: "OK", onPress: () => navigation.navigate('HomeScreenWithQuiz') }]
      );
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
        const isCorrect = option.isCorrect;
        let backgroundColor = '#fff';

        if (showFeedback) {
          if (isSelected) {
            backgroundColor = isCorrect ? '#4CAF50' : '#F44336';
          } else if (isCorrect) {
            backgroundColor = '#4CAF50';
          }
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor }]}
            onPress={() => handleOptionPress(index)}
            disabled={showFeedback}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>
            {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// --- Save Score (still local AsyncStorage for now) ---
async function saveScore(level, score) {
  try {
    const stored = await AsyncStorage.getItem('quizHistory');
    let history = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          history = parsed;
        }
      } catch (e) {
        history = [];
      }
    }

    const newEntry = { date: new Date().toLocaleString(), level, score };
    history.push(newEntry);
    await AsyncStorage.setItem('quizHistory', JSON.stringify(history));
  } catch (e) {
    console.log('Error saving score', e);
  }
}

// --- Score History Screen ---
export function ScoreHistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('quizHistory');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
          }
        }
      } catch (e) {
        console.log('Error loading history', e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.quizTitle}>📜 Score History</Text>
      {history.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>{item.date}</Text>
              <Text>{item.level} - {item.score} pts</Text>
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
      <Stack.Screen name="HomeScreenWithQuiz" component={HomeScreenWithQuiz} options={{ title: 'Home' }} />
      <Stack.Screen name="QuizSelectionScreen" component={QuizSelectionScreen} options={{ title: 'Select Quiz' }} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="ScoreHistoryScreen" component={ScoreHistoryScreen} options={{ title: 'Score History' }} />
    </Stack.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#2E7D32',
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginTop: 40,
    gap: 20,
  },
  mainButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginBottom: 20,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1B5E20',
  },
  difficultyCard: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
  },
  difficultyText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B5E20',
  },
  quizPage: {
    flex: 1,
    backgroundColor: '#DFF0D8',
    justifyContent: 'center',
    padding: 20,
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
