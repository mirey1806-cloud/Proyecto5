// src/plugins/firebase.js

// Importar funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 👈 Faltaba esta línea

// Configuración de Firebase (copiada desde tu consola)
const firebaseConfig = {
  apiKey: "AIzaSyDAYS_Mwi95qT9XA94NhIxOci7VMtNEDLw",
  authDomain: "proyecto5-f2209.firebaseapp.com",
  projectId: "proyecto5-f2209",
  storageBucket: "proyecto5-f2209.appspot.com", // 👈 corregido aquí
  messagingSenderId: "511625918855",
  appId: "1:511625918855:web:b71df1ca0a43948585bb22",
  measurementId: "G-7KB0L61QDX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Exportar para uso en Vue
export { app, analytics, db };
