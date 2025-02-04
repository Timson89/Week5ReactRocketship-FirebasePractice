// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMf7JMFsuJ_PebRuUSkB9-maNVAjZ81TQ",
  authDomain: "practice-firebase-01-29-25.firebaseapp.com",
  projectId: "practice-firebase-01-29-25",
  storageBucket: "practice-firebase-01-29-25.firebasestorage.app",
  messagingSenderId: "443380027257",
  appId: "1:443380027257:web:5f931b4b1e3e9fc935a9a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();