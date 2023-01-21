// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };