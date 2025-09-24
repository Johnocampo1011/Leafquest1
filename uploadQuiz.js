// uploadQuiz.js
import { db } from "./firebaseAdminConfig.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { basicQuestions, hardQuestions, professionalQuestions } from "./quizData.js";

async function uploadQuiz() {
  try {
    console.log("📝 Starting quiz data upload...");

    // Function to upload each set of questions
    const uploadQuestionsByCategory = async (questions, category) => {
      for (const [index, question] of questions.entries()) {
        // 🔍 Check if the question already exists in Firestore
        const q = query(
          collection(db, "Quiz"),
          where("question", "==", question.question)
        );
        const existing = await getDocs(q);

        if (existing.empty) {
          // 🆕 Use question text + category + index as unique ID
          const questionId = `${category}_${index + 1}`;
          const questionRef = doc(db, "newQuiz", questionId);

          await setDoc(questionRef, {
            ...question,
            category,
            createdAt: new Date(),
          });

          console.log(`✅ Uploaded [${category}]: ${question.question}`);
        } else {
          console.log(`⚠️ Skipped [${category}]: ${question.question} (already exists)`);
        }
      }
    };

    // Upload all categories

    await uploadQuestionsByCategory(professionalQuestions, "professional");

    console.log("🎉 Quiz data upload completed!");
  } catch (error) {
    console.error("❌ Error uploading quiz questions:", error);
  }
}

// 🚀 Run the uploader
uploadQuiz();