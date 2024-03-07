import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );
      navigate("/");
      console.log("Logged in");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        className="p-4 flex flex-col gap-2 items-center justify-center"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border-2 p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border-2 p-2"
        />
        <button type="submit" className="bg-green-300 py-1 px-8 rounded-md">
          Login
        </button>
      </form>
      <div className="text-red-400 p-2">{errorMessage}</div>
      <a href="/sign-up">Sign Up</a>
    </div>
  );
}

export default Login;
