

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyDYN4n4M57DIyV7ObQaWtuezZB3uRfF2AI",
  authDomain: "mindful-1a934.firebaseapp.com",
  projectId: "mindful-1a934",
  storageBucket: "mindful-1a934.firebasestorage.app",
  messagingSenderId: "16153642127",
  appId: "1:16153642127:web:34413542538fa63bf81cfa",
  measurementId: "G-G002ZQMJ7T"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
