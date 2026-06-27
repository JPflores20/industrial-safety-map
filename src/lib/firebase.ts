import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClNERVfb4usDE8jML6AGrNTO_SX3qOLE4",
  authDomain: "safety-map-907c2.firebaseapp.com",
  projectId: "safety-map-907c2",
  storageBucket: "safety-map-907c2.firebasestorage.app",
  messagingSenderId: "242232667601",
  appId: "1:242232667601:web:366b190eb4eb7e1ad284f0",
  measurementId: "G-7TRZDXFD6V"
};

// ─── Inicialización de Firebase ───
// Inicializa la aplicación principal de Firebase usando la configuración
const app = initializeApp(firebaseConfig);

// ─── Inicialización de Google Analytics ───
// Analytics solo se puede inicializar si estamos corriendo en el navegador (client-side)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// ─── Inicialización de Firestore (Base de datos en tiempo real) ───
export const db = getFirestore(app);

// ─── Inicialización de Authentication (Sistema de logueo) ───
export const auth = getAuth(app);

export default app;
