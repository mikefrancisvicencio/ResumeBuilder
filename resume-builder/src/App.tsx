import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./routes/SignUp";
import Builder from "./routes/Builder";
import "bootstrap/dist/css/bootstrap.min.css";
import Preview from "./routes/Preview";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // for strict login screen, can't open home without
      <ProtectedRoute>
        <Builder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/preview",
    element: (
      <ProtectedRoute>
        <Preview />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
