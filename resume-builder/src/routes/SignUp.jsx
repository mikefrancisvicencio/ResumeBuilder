import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";

function Signup() {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value
      );
      navigate("/");
      console.log("Signed up");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h2>Signup</h2>
      <form
        onSubmit={handleSignup}
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
        <button type="submit" className="bg-green-300 px-8 py-1 rounded-md">
          Signup
        </button>
      </form>
      <div className="text-red-400 p-1">{errorMessage}</div>
      <a href="/login">Login</a>
    </div>
  );
}

export default Signup;
