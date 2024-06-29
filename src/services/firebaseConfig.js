// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB15i8Th5_mI4qSZWGaTXksp4964XNwhAU",
  authDomain: "pinata-fab.firebaseapp.com",
  projectId: "pinata-fab",
  storageBucket: "pinata-fab.appspot.com",
  messagingSenderId: "165965733794",
  appId: "1:165965733794:web:3090dc9f83a7d7ab5d5cfb",
  measurementId: "G-WZ7NZQC5EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Firestore
const db = getFirestore(app);

export { db };