// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5W1tAS0YldQsC-ES6ZDskOmCMNDZN3BQ",
  authDomain: "create-my-checkers-228.firebaseapp.com",
  projectId: "create-my-checkers-228",
  storageBucket: "create-my-checkers-228.appspot.com",
  messagingSenderId: "575660358146",
  appId: "1:575660358146:web:8b8fd267471bf3d74a051b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");