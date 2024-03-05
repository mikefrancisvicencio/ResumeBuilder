// firebase authentication 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { resetResumeFromStorage } from "./src/storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJAAzm3vNNOeuoJxJKmYdU6jxEaqk1NCw",
  authDomain: "resumebuilder-6ade2.firebaseapp.com",
  projectId: "resumebuilder-6ade2",
  storageBucket: "resumebuilder-6ade2.appspot.com",
  messagingSenderId: "547854204790",
  appId: "1:547854204790:web:a147d0c3f5f65f5a228457",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// user login 
document.getElementById("loginButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      window.location.href = "CoffeeMaker.html"; 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error").innerText = errorMessage;
    });
});

// user register
document.getElementById("registerButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Clear the resume from storage
      // NOTE: here resets ALL the data in the device storage, no matter the 
      // login status. NEED TO FIX !! 
      resetResumeFromStorage();
      // Account created & user logged in
      alert("Account successfully created. You are now logged in.");
      // Redirect to resume page
      window.location.href = "CoffeeMaker.html"; 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error").innerText = errorMessage;
    });
});
