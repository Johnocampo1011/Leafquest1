import fs from "fs";
import admin from "firebase-admin";

// ✅ Load service account JSON with fs instead of "assert"
const serviceAccount = JSON.parse(
  fs.readFileSync("./leafquest-a7c32-firebase-adminsdk-fbsvc-b7015a6cae.json", "utf8")
);

// Initialize Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importQuestions() {
  try {
    const data = JSON.parse(fs.readFileSync("questions.json", "utf8"));

    const batch = db.batch();
    const quizCollection = db.collection("quiz"); // lowercase "quiz"

    data.forEach((question, index) => {
      const docRef = quizCollection.doc(`q${index + 1}`);
      batch.set(docRef, question);
    });

    await batch.commit();
    console.log("✅ Successfully imported questions into Firestore!");
  } catch (error) {
    console.error("❌ Error importing questions:", error);
  }
}

importQuestions();
