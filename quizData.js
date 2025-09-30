// quizData.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// 🔀 Shuffle helper
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// ✅ Fetch questions from Firestore
export async function fetchQuestions(limit = 10) {
  try {
    const querySnapshot = await getDocs(collection(db, "quiz"));

    let questions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.question && Array.isArray(data.options)) {
        questions.push({
          id: doc.id, // keep the document ID in case we need it later
          question: data.question,
          options: shuffle(data.options), // randomize choices
          correctAnswer: data.correctAnswer, // store correct answer
        });
      }
    });

    if (questions.length === 0) {
      console.log("⚠️ No quiz data found in Firestore!");
      return [];
    }

    // 🔀 Shuffle all questions & limit how many to return
    return shuffle(questions).slice(0, limit);
  } catch (error) {
    console.error("❌ Error fetching quiz data:", error);
    return [];
  }
}

