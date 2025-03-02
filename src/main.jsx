import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./Pages/errorpage.jsx";
import LoginPage from "./Pages/login.jsx";
import DashbordPage from "./Pages/dashboard.jsx";
import UserListPage from "./Pages/user.jsx";
import ReportPage from "./Pages/report.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ProfilPelajar from "./Pages/profilpelajar.jsx";
import Fase from "./Components/Fragments/Fase/Fase.jsx";
import Kelas from "./Components/Fragments/Kelas/Kelas.jsx";
import MataPelajaran from "./Components/Fragments/MataPelajaran/MataPelajaran.jsx";
import Kurikulum from "./Components/Fragments/Kurikulum/Kurikulum.jsx";
import CapaianPembelajaran from "./Components/Fragments/Kurikulum/CapaianPembelajaran/CapaianPembelajaran.jsx";
import TujuanPembelajaran from "./Components/Fragments/Kurikulum/TujuanPembelajaran/TujuanPembelajaran.jsx";

// router
const router = createBrowserRouter([
  {
    path: "/*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashbordPage />,
    children: [
      {
        path: "",
        element: <Fase />,
      },
      {
        path: "fase/:id",
        element: <Kelas />,
      },
      {
        path: "fase/:id/kelas/mp/:idKelas",
        element: <MataPelajaran />,
      },
      {
        path: "fase/:id/kelas/mp/:idKelas/kurikulum/:idMp",
        element: <Kurikulum />,
      },
      {
        path: "fase/:id/kelas/mp/:idKelas/kurikulum/:idMp/cp",
        element: <CapaianPembelajaran />,
      },
      {
        path: "fase/:id/kelas/mp/:idKelas/kurikulum/:idMp/tp",
        element: <TujuanPembelajaran />,
      },
    ],
  },
  {
    path: "/users",
    element: <UserListPage />,
  },
  {
    path: "/report",
    element: <ReportPage />,
  },
  {
    path: "/profilpelajar",
    element: <ProfilPelajar />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
