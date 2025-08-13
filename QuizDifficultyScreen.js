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
      <Text style={styles.title}>Ready to take a quiz?</Text>

      {/* START Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('QuizSelectionScreen')}
      >
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>

      {/* History Button */}
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('ScoreHistoryScreen')}
      >
        <Ionicons name="time-outline" size={20} color="#fff" />
        <Text style={{ color: '#fff', marginLeft: 5 }}>History</Text>
      </TouchableOpacity>
    </View>
  );
}


// --- Difficulty Selection ---
export function QuizSelectionScreen({ navigation }) {
  return (
    <View style={styles.quizContainer}>
      <Text style={styles.quizTitle}>Choose Your Quiz Difficulty</Text>

      <TouchableOpacity
        style={styles.difficultyButton}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Basic' })}
      >
        <Text style={styles.difficultyText}>🌱 Basic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.difficultyButton}
        onPress={() => navigation.navigate('QuizScreen', { level: 'Hard' })}
      >
        <Text style={styles.difficultyText}>🌿 Hard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.difficultyButton}
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
  homeContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: '#2C5D1E',
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    elevation: 5,
  },
  historyButton: {
    flexDirection: 'row',
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  historyText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  quizContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  difficultyButton: {
    backgroundColor: '#97BD99',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  difficultyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  quizPage: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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

  startButton: {
  backgroundColor: '#2C5D1E',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 10,
  marginTop: 100,
},
startButtonText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
},
});
