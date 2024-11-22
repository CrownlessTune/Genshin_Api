// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importa getAuth para manejar autenticación
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWkRhSeFV0u356sq4Wc4fwLJURKT2O3Kg",
  authDomain: "genshin-api-1c30a.firebaseapp.com",
  projectId: "genshin-api-1c30a",
  storageBucket: "genshin-api-1c30a.firebasestorage.app",
  messagingSenderId: "971669915113",
  appId: "1:971669915113:web:7e18ef44fe45701a0fb778",
  measurementId: "G-6TL2FY271H",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios necesarios
export const auth = getAuth(app); // Exporta `auth` para autenticación
export const analytics = getAnalytics(app); // Si necesitas analytics
