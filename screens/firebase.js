import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ofjR3HSEBRwwqDJgGHemFD_JePF0qYU",
  authDomain: "plant-dex-9e9e8.firebaseapp.com",
  projectId: "plant-dex-9e9e8",
  storageBucket: "plant-dex-9e9e8.appspot.com",
  messagingSenderId: "295245831860",
  appId: "1:295245831860:web:3a842285210569a53941e1",
  measurementId: "G-J81VGJ6KCM"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);