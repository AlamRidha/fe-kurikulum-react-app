import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./Pages/errorpage.jsx";
import LoginPage from "./Pages/login.jsx";
import DashbordPage from "./Pages/dashboard.jsx";
import UserListPage from "./Pages/user.jsx";
import ReportPage from "./Pages/report.jsx";

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
  {
    path: "/dashboard",
    element: <DashbordPage />,
  },
  {
    path: "/users",
    element: <UserListPage />,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
