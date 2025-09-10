// quizData.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Fetch questions for a given level (Basic, Hard, Professional)
export async function fetchQuestions(level) {
  const docRef = doc(db, "quizzes", level); // collection: quizzes, doc: Basic/Hard/Professional
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().questions;
  } else {
    console.log("No such quiz data for level:", level);
    return [];
  }
}
