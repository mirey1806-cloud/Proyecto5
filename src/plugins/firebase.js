// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAYS_Mwi95qT9XA94NhIxOci7VMtNEDLw",
  authDomain: "proyecto5-f2209.firebaseapp.com",
  projectId: "proyecto5-f2209",
  storageBucket: "proyecto5-f2209.firebasestorage.app",
  messagingSenderId: "511625918855",
  appId: "1:511625918855:web:b71df1ca0a43948585bb22",
  measurementId: "G-7KB0L61QDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics, db };