import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACGE7MLoBY0yWjBX6IJOmpQgHu3PqHrqU",
  authDomain: "e-commerce-58231.firebaseapp.com",
  projectId: "e-commerce-58231",
  storageBucket: "e-commerce-58231.appspot.com",
  messagingSenderId: "126629251801",
  appId: "1:126629251801:web:e7042ebb55b4872adf0cc8",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
