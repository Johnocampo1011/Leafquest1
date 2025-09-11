import fs from "fs";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc
} from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig"; // your Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Path to your new quiz JSON file
const quizFilePath = "./quiz.json";

// Function to delete all documents in a collection
async function deleteCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const promises = querySnapshot.docs.map((document) =>
    deleteDoc(doc(db, collectionName, document.id))
  );
  await Promise.all(promises);
  console.log(`✅ Deleted all documents in "${collectionName}" collection.`);
}

// Function to upload new quiz data
async function uploadQuiz(collectionName) {
  const quizData = JSON.parse(fs.readFileSync(quizFilePath, "utf-8"));
  const promises = quizData.map((question) => addDoc(collection(db, collectionName), question));
  await Promise.all(promises);
  console.log(`✅ Uploaded ${quizData.length} new questions to "${collectionName}" collection.`);
}

// Main function
async function resetQuizCollection() {
  try {
    await deleteCollection("Quiz");
    await uploadQuiz("Quiz");
    console.log("🎉 Quiz collection successfully reset with new data!");
  } catch (error) {
    console.error("❌ Error resetting Quiz collection:", error);
  }
}

resetQuizCollection();
