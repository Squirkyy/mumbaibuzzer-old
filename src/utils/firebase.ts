// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtQEMBn1khDHE_fL_h5XGHeWl4AOPixX8",
  authDomain: "mumbaibuzzer.firebaseapp.com",
  projectId: "mumbaibuzzer",
  storageBucket: "mumbaibuzzer.appspot.com",
  messagingSenderId: "477871629287",
  appId: "1:477871629287:web:dc8aa91386220fdec79342",
  measurementId: "G-HLY3CRGZ82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };