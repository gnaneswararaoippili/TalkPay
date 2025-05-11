// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database"; // Firebase Realtime Database imports

const firebaseConfig = {
  apiKey: "AIzaSyC7U1_KKvV9sIYxqFXFt_2IuhHFvRUu5t0",
  authDomain: "digital-wallet-e44e2.firebaseapp.com",
  projectId: "digital-wallet-e44e2",
  storageBucket: "digital-wallet-e44e2.firebasestorage.app",
  messagingSenderId: "153949197760",
  appId: "1:153949197760:web:09b5e5569a3fc028eea425"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, ref, update }; // Export necessary items
