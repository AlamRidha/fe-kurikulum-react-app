import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./Pages/errorpage.jsx";
import LoginPage from "./Pages/login.jsx";
import FormLogin from "./Components/Fragments/FormLogin.jsx";
import AuthLayout from "./Components/Layouts/AuthLayout.jsx";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
