// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIcoK88agN9byD0EX09ceJsttNG3OzFTA",
  authDomain: "leafquest-a7c32.firebaseapp.com",
  projectId: "leafquest-a7c32",
  storageBucket: "leafquest-a7c32.firebasestorage.app",
  messagingSenderId: "1055040544202",
  appId: "1:1055040544202:web:31d6f452ecd1f92d384333",
  measurementId: "G-G27NH602P0"
};

// ✅ Initialize Firebase app (safe even if called multiple times)
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth ONCE safely
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized, just get the existing instance
  auth = getAuth(app);
}

export { app, auth };
export const db = getFirestore(app);