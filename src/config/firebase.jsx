
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBWkRhSeFV0u356sq4Wc4fwLJURKT2O3Kg",
  authDomain: "genshin-api-1c30a.firebaseapp.com",
  projectId: "genshin-api-1c30a",
  storageBucket: "genshin-api-1c30a.appspot.com", 
  messagingSenderId: "971669915113",
  appId: "1:971669915113:web:7e18ef44fe45701a0fb778",
  measurementId: "G-6TL2FY271H",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
export const analytics = getAnalytics(app); 
