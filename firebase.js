// src/firebase.js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Only include this if you're using analytics

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM5eQ5xDr49sMJUtjfepnoUiPgTnuOvcA",
  authDomain: "task-management-f584d.firebaseapp.com",
  projectId: "task-management-f584d",
  storageBucket: "task-management-f584d.appspot.com",
  messagingSenderId: "1080741122678",
  appId: "1:1080741122678:web:fc68de539cb874047c8557",
  measurementId: "G-E193CRFKX6" // Only needed if using Firebase Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);  // Initialize Auth service
const db = getFirestore(app);  // Initialize Firestore service

// Export services
export { auth, db };
