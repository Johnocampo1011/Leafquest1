// firebaseAdminConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIcoK88agN9byD0EX09ceJsttNG3OzFTA",
  authDomain: "leafquest-a7c32.firebaseapp.com",
  projectId: "leafquest-a7c32",
  storageBucket: "leafquest-a7c32.firebasestorage.app",
  messagingSenderId: "1055040544202",
  appId: "1:1055040544202:web:31d6f452ecd1f92d384333",
  measurementId: "G-G27NH602P0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
