// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIYezI7Xh_e4tX23_gE0_CMLML18oj-2k",
  authDomain: "taskmanagement-5f9c1.firebaseapp.com",
  projectId: "taskmanagement-5f9c1",
  storageBucket: "taskmanagement-5f9c1.firebasestorage.app",
  messagingSenderId: "1079751709883",
  appId: "1:1079751709883:web:de996f395b4dc4ddba059e",
  measurementId: "G-ZFRV8L0PG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
