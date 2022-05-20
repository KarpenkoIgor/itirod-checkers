// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {   
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
 } from 'firebase/auth'
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
//connectAuthEmulator(auth, "http://localhost:9099");

export const signInWithEmail = async (loginEmail, loginPassword, callback) => {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signUpWithEmail = async (loginEmail, loginPassword, callback) => {
  if (!loginEmail.trim()) return;

  await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signOutFromApp = async () => {
    await signOut(auth);
};

export const monitorAuthState = async (setUserData, callback) =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      setUserData({
        id: user.uid,
        isSignedIn: true,
        name: user.email,
      });
      callback();
    } else {
      console.log("no user");
      setUserData({});
    }
});