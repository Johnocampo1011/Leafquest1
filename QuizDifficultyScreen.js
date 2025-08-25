// QuizFeature.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { basicQuestions, hardQuestions, professionalQuestions } from './quizData';

// --- Home Screen ---
export function HomeScreenWithQuiz({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>🌱 Ready to take a quiz?</Text>

      {/* START + History + Shop stacked with space */}
      <View style={styles.buttonColumn}>
        {/* START Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('QuizSelectionScreen')}
        >
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>

        {/* HISTORY Button */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('ScoreHistoryScreen')}
        >
          <Ionicons name="time-outline" size={20} color="#fff" />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>

        {/* SHOP Button (placeholder) */}
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => alert('Shop coming soon!')}
        >
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.shopText}>Shop</Text>
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
        <Text style={styles.difficultyText}>🌱 Basic</Text>
      </TouchableOpacity>

      {/* Hard */}
      <TouchableOpacity
        style={[styles.difficultyCard, { backgroundColor: '#A5D6A7' }]}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Hard' })}
      >
        <Text style={styles.difficultyText}>🌿 Hard</Text>
      </TouchableOpacity>

      {/* Professional */}
      <TouchableOpacity
        style={[styles.difficultyCard, { backgroundColor: '#81C784' }]}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Professional' })}
      >
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

  useEffect(() => {
    let questionPool = [];
    if (level === 'Basic') questionPool = basicQuestions;
    else if (level === 'Hard') questionPool = hardQuestions;
    else if (level === 'Professional') questionPool = professionalQuestions;

    const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, [level]);

  if (questions.length === 0) {
    return (
      <View style={styles.quizPage}>
        <Text style={styles.quizTitle}>Loading {level} Quiz...</Text>
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

// --- Save Score ---
async function saveScore(level, score) {
  try {
    const stored = await AsyncStorage.getItem('quizHistory');
    let history = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          history = parsed;
        } else {
          history = [{ date: new Date().toLocaleString(), level: 'Unknown', score: Number(parsed) }];
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
          } else {
            setHistory([{ date: new Date().toLocaleString(), level: 'Unknown', score: Number(parsed) }]);
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
      <Text style={styles.quizTitle}>Score History</Text>
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
  // --- Home ---
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
  startButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyButton: {
    flexDirection: 'row',
    backgroundColor: '#6D4C41',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    elevation: 3,
  },
  historyText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  shopButton: {
    flexDirection: 'row',
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    elevation: 3,
  },
  shopText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- Difficulty Selection ---
  selectionContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 30,
    textAlign: 'center',
  
  },
  difficultyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000000ff',
  },

  // --- Quiz Page ---
  quizContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B5E20',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
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
    color: '#000000ff',
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

  // --- History ---
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

