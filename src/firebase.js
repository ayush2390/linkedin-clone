import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs1WbAGqS6uxmPLK6m5P_a8hLmB5r9Ybw",
  authDomain: "linkedin-clone-fc203.firebaseapp.com",
  projectId: "linkedin-clone-fc203",
  storageBucket: "linkedin-clone-fc203.appspot.com",
  messagingSenderId: "1058028509050",
  appId: "1:1058028509050:web:3cd186f66a0e57c035a8c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, doc, setDoc, getDoc, onSnapshot, collection };
export default db;
