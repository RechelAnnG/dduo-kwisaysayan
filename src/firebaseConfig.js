import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDeh4XJQChN7lcv0J6lkxZagwgxJ24QljY",
  authDomain: "kwisaysayan.firebaseapp.com",
  projectId: "kwisaysayan",
  storageBucket: "kwisaysayan.appspot.com",
  messagingSenderId: "982039929762",
  appId: "1:982039929762:web:ba5ca9ab404ff131e9c8fb",
  measurementId: "G-7EB8RHEX6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);  // Export Firestore database instance