// firebaseUtils.js
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

/**
 * ✅ Get current user's UID
 */
function getCurrentUserId() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");
  return user.uid;
}

/**
 * ✅ Fetch user's current Leaf Points
 */
export async function getUserLeafPoints() {
  try {
    const uid = getCurrentUserId();
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data().leafPoints || 0;
    } else {
      // Create user doc if missing
      await setDoc(userRef, { leafPoints: 0, quizHistory: [] });
      return 0;
    }
  } catch (error) {
    console.error("❌ Error getting user points:", error);
    return 0;
  }
}

/**
 * ✅ Add Leaf Points to user
 */
export async function addLeafPoints(points) {
  try {
    const uid = getCurrentUserId();
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      leafPoints: increment(points),
    });

    console.log(`🌱 Added ${points} points to user ${uid}`);
  } catch (error) {
    console.error("❌ Error adding points:", error);

    // If user doc doesn't exist yet, create it
    if (error.message.includes("No document to update")) {
      const uid = getCurrentUserId();
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { leafPoints: points, quizHistory: [] });
      console.log(`🌱 Created new user doc with ${points} points`);
    }
  }
}

/**
 * ✅ Save quiz attempt history
 * @param {number} score - User's quiz score
 * @param {number} total - Total questions in the quiz
 */
export async function saveQuizHistory(score, total) {
  try {
    const uid = getCurrentUserId();
    const userRef = doc(db, "users", uid);

    const attempt = {
      score,
      total,
      date: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      quizHistory: arrayUnion(attempt),
    });

    console.log("📜 Quiz history saved:", attempt);
  } catch (error) {
    console.error("❌ Error saving quiz history:", error);

    // If user doc doesn't exist yet, create it with history
    if (error.message.includes("No document to update")) {
      const uid = getCurrentUserId();
      const userRef = doc(db, "users", uid);

      const attempt = {
        score,
        total,
        date: new Date().toISOString(),
      };

      await setDoc(userRef, {
        leafPoints: 0,
        quizHistory: [attempt],
      });

      console.log("📜 Created user doc with first quiz history");
    }
  }
}
