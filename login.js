import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

document.getElementById("loginButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      window.location.href = "CoffeeMaker.html"; // Redirect to your resume builder page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error").innerText = errorMessage;
    });
});

document.getElementById("registerButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Account created & user logged in
      alert("Account successfully created. You are now logged in.");
      window.location.href = "resumeBuilderPage.html"; // Redirect to your resume builder page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("error").innerText = errorMessage;
    });
});