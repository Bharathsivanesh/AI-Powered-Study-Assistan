import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBkQWKzvQ7wJ68CkSZfEfDBj-Sikj1QzTY",
  authDomain: "staffconnect-ae358.firebaseapp.com",
  projectId: "staffconnect-ae358",
  storageBucket: "staffconnect-ae358.firebasestorage.app",
  messagingSenderId: "581190643657",
  appId: "1:581190643657:web:bb02ad2abe9dbb762a4218",
  measurementId: "G-BKDPSXBQNF",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
