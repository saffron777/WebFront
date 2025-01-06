// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx7b0SaGQQezRwk-EmOY4deITdD7_b120",
  authDomain: "gruas-ucab-fbaca.firebaseapp.com",
  projectId: "gruas-ucab-fbaca",
  storageBucket: "gruas-ucab-fbaca.firebasestorage.app",
  messagingSenderId: "353167037324",
  appId: "1:353167037324:web:98f90e1f9dc563b0237ca9",
  measurementId: "G-MZ5BGFCRBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)