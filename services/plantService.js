import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // adjust path if needed

export async function savePlant(plantId, plantData) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User must be logged in");
  }

  await setDoc(doc(db, "plants", plantId), {
    ...plantData,
    ownerUid: user.uid,  // 🔑 required for Firestore rules
  });
}

import { collection, query, where, getDocs } from "firebase/firestore";

export async function getUserPlants() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User must be logged in");
  }

  const q = query(
    collection(db, "plants"),
    where("ownerUid", "==", user.uid)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}