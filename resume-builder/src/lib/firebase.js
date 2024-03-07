import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJAAzm3vNNOeuoJxJKmYdU6jxEaqk1NCw",
  authDomain: "resumebuilder-6ade2.firebaseapp.com",
  projectId: "resumebuilder-6ade2",
  storageBucket: "resumebuilder-6ade2.appspot.com",
  messagingSenderId: "547854204790",
  appId: "1:547854204790:web:a147d0c3f5f65f5a228457",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
