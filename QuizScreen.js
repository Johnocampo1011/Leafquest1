import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
  {
    question: "What is the best light condition for a Rose plant?",
    options: [
      { text: "Full sunlight", isCorrect: true },
      { text: "Full shade", isCorrect: false },
      { text: "No light needed", isCorrect: false },
      { text: "Artificial light only", isCorrect: false },
    ],
  },
  {
    question: "How often should you water a Sunflower?",
    options: [
      { text: "Once a week", isCorrect: false },
      { text: "Every day", isCorrect: false },
      { text: "When soil is dry", isCorrect: true },
      { text: "Never", isCorrect: false },
    ],
  },
  {
    question: "Which family does Tulip belong to?",
    options: [
      { text: "Rosaceae", isCorrect: false },
      { text: "Liliaceae", isCorrect: true },
      { text: "Asteraceae", isCorrect: false },
      { text: "Fabaceae", isCorrect: false },
    ],
  },
  {
    question: "What do plants need for photosynthesis?",
    options: [
      { text: "Sunlight, water, and carbon dioxide", isCorrect: true },
      { text: "Only water", isCorrect: false },
      { text: "Only soil", isCorrect: false },
      { text: "Only fertilizer", isCorrect: false },
    ],
  },
  {
    question: "Which part of the plant absorbs water and nutrients?",
    options: [
      { text: "Roots", isCorrect: true },
      { text: "Leaves", isCorrect: false },
      { text: "Flowers", isCorrect: false },
      { text: "Stems", isCorrect: false },
    ],
  },
];

export default function QuizScreen({ navigation }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (index) => {
    if (showFeedback) return;
    setSelectedOptionIndex(index);
    setShowFeedback(true);
    if (currentQuestion.options[index].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextPress = async () => {
    setSelectedOptionIndex(null);
    setShowFeedback(false);
  
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        await AsyncStorage.setItem('lastQuizScore', String(score));
      } catch (e) {
        console.log('Error saving score:', e);
      }
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Homescreen' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionCount}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((option, index) => {
        const isSelected = index === selectedOptionIndex;
        const isCorrect = option.isCorrect;
        let backgroundColor = 'white';
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
            disabled={showFeedback || quizFinished}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        );
      })}

      {showFeedback && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextPress}
          disabled={quizFinished}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0fff0', justifyContent: 'center' },
  questionCount: { fontSize: 16, marginBottom: 10, color: '#555' },
  questionText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  optionButton: { padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#888', marginBottom: 15 },
  optionText: { fontSize: 18, color: '#333' },
  nextButton: { marginTop: 20, backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center' },
  nextButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
