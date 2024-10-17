import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn5K9ZtEWUgJv91BtRbAHFO5Fm-DQwEa0",
  authDomain: "investing-portfolio-av-api.firebaseapp.com",
  projectId: "investing-portfolio-av-api",
  storageBucket: "investing-portfolio-av-api.appspot.com",
  messagingSenderId: "259081392960",
  appId: "1:259081392960:web:7b640ec83a2b43ca36e0a5",
  measurementId: "G-K1M2TQLZEP",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });
