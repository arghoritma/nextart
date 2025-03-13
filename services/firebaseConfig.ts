// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB84rVbpDXXSxj04pLa0FJ23zIbCriiVDs",
  authDomain: "nextart-arghoritma.firebaseapp.com",
  projectId: "nextart-arghoritma",
  storageBucket: "nextart-arghoritma.firebasestorage.app",
  messagingSenderId: "209111306229",
  appId: "1:209111306229:web:58bc478588b7a5f6fb9abc",
  measurementId: "G-PVME17HBYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

