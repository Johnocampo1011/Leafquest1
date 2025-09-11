// quizData.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Fetch questions f
export async function fetchQuestions(level) {
  const docRef = doc(db, "quizzes", level); 
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().questions;
  } else {
    console.log("No such quiz data for level:", level);
    return [];
  }
}
