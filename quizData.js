// quizData.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Shuffle helper
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function fetchQuestions(limit = 10) {
  try {
    const querySnapshot = await getDocs(collection(db, "Quiz"));

    let questions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data.question && Array.isArray(data.options)) {
        questions.push({
          ...data,
          options: shuffle(data.options), // ✅ shuffle choices
        });
      }
    });

    if (questions.length === 0) {
      console.log("⚠️ No quiz data found in Firestore!");
      return [];
    }

    // ✅ shuffle questions
    return shuffle(questions).slice(0, limit);
  } catch (error) {
    console.error("❌ Error fetching quiz data:", error);
    return [];
  }
}
