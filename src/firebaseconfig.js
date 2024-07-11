// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm9vjbwNjMsxVNB6CSunfzlL1Yk6ByBs4",
  authDomain: "reactfirebase-978e9.firebaseapp.com",
  databaseURL: "https://reactfirebase-978e9-default-rtdb.firebaseio.com",
  projectId: "reactfirebase-978e9",
  storageBucket: "reactfirebase-978e9.appspot.com",
  messagingSenderId: "701216432643",
  appId: "1:701216432643:web:e2fedc99ade36ae2536436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

console.log("Firebase app initialized:", app);
console.log("Auth instance:", auth);
console.log("Database instance:", database); 

export { auth, database };

export default app;