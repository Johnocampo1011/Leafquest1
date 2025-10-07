// userData.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  collection,
  getDocs,
  query,
} from "firebase/firestore";

const ASYNC_POINTS_KEY = "leafPoints";
const ASYNC_HISTORY_KEY = "quizHistory";
const ASYNC_INVENTORY_KEY = "userInventory";

export function getCurrentUser() {
  const auth = getAuth();
  return auth.currentUser || null;
}

async function ensureUserDoc(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      leafPoints: 0,
      quizHistory: [],
    });
  }
  return userRef;
}

// 🪴 Leaf Points
export async function getLeafPointsForUser() {
  const user = getCurrentUser();
  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) return Number(snap.data().leafPoints ?? 0);
  }
  const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export async function addLeafPointsForUser(pointsToAdd) {
  const user = getCurrentUser();
  if (user) {
    const ref = await ensureUserDoc(user.uid);
    await updateDoc(ref, { leafPoints: increment(pointsToAdd) });
    const snap = await getDoc(ref);
    return Number(snap.data().leafPoints ?? 0);
  }
  const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
  const current = stored ? parseInt(stored, 10) : 0;
  const updated = current + pointsToAdd;
  await AsyncStorage.setItem(ASYNC_POINTS_KEY, String(updated));
  return updated;
}

export async function spendLeafPointsForUser(cost) {
  const user = getCurrentUser();
  if (user) {
    const ref = await ensureUserDoc(user.uid);
    const snap = await getDoc(ref);
    const current = Number(snap.data().leafPoints ?? 0);
    if (current >= cost) {
      await updateDoc(ref, { leafPoints: current - cost });
      return { success: true, remaining: current - cost };
    }
    return { success: false, remaining: current };
  }
  const stored = await AsyncStorage.getItem(ASYNC_POINTS_KEY);
  const current = stored ? parseInt(stored, 10) : 0;
  if (current >= cost) {
    const updated = current - cost;
    await AsyncStorage.setItem(ASYNC_POINTS_KEY, String(updated));
    return { success: true, remaining: updated };
  }
  return { success: false, remaining: current };
}

// 🧠 Quiz
export async function saveQuizAttemptForUser(entry) {
  const user = getCurrentUser();
  if (user) {
    const ref = await ensureUserDoc(user.uid);
    await updateDoc(ref, { quizHistory: arrayUnion(entry) });
    return true;
  }
  const stored = await AsyncStorage.getItem(ASYNC_HISTORY_KEY);
  const history = stored ? JSON.parse(stored) : [];
  history.push(entry);
  await AsyncStorage.setItem(ASYNC_HISTORY_KEY, JSON.stringify(history));
  return true;
}

export async function fetchQuizHistoryForUser() {
  const user = getCurrentUser();
  if (user) {
    const snap = await getDoc(doc(db, "users", user.uid));
    return snap.exists() ? snap.data().quizHistory ?? [] : [];
  }
  const stored = await AsyncStorage.getItem(ASYNC_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

// 🌿 Inventory (Firestore-Synced)
export async function addItemToInventory(item) {
  const user = getCurrentUser();
  if (user) {
    const invRef = doc(db, "users", user.uid, "inventory", item.name);
    const snap = await getDoc(invRef);

    if (snap.exists()) {
      const currentQty = snap.data().quantity ?? 0;
      await updateDoc(invRef, { quantity: currentQty + 1 });
    } else {
      await setDoc(invRef, {
        icon: item.icon,
        quantity: 1,
      });
    }
    return true;
  }

  // fallback to local
  const stored = await AsyncStorage.getItem(ASYNC_INVENTORY_KEY);
  const inventory = stored ? JSON.parse(stored) : [];
  const idx = inventory.findIndex((i) => i.name === item.name);
  if (idx >= 0) inventory[idx].quantity += 1;
  else inventory.push({ name: item.name, icon: item.icon, quantity: 1 });
  await AsyncStorage.setItem(ASYNC_INVENTORY_KEY, JSON.stringify(inventory));
  return true;
}

export async function fetchInventory() {
  const user = getCurrentUser();
  if (user) {
    const invCol = collection(db, "users", user.uid, "inventory");
    const qSnap = await getDocs(query(invCol));
    const data = [];
    qSnap.forEach((d) => data.push({ name: d.id, ...d.data() }));
    return data;
  }

  // fallback local
  const stored = await AsyncStorage.getItem(ASYNC_INVENTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}
