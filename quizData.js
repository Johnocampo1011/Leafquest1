// quizData.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Fetch random quiz questions
 * @param {number} limit - number of questions to return (default = 10)
 */
export async function fetchQuestions(limit = 10) {
  try {
    // Get all questions from Firestore collection "Quiz"
    const querySnapshot = await getDocs(collection(db, "Quiz"));

    let questions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.question && data.options) {
        questions.push(data);
      }
    });

    if (questions.length === 0) {
      console.log("⚠️ No questions found in Firestore!");
      return [];
    }

    // Shuffle helper
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    // Shuffle options inside each question
    questions = questions.map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));

    // Shuffle questions and return limited set
    return shuffle(questions).slice(0, limit);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
}
