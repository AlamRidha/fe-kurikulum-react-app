import { useEffect, useState } from "react";
import Navbar from "../Fragments/Navbar";
import Sidebar from "../Fragments/Sidebar";
import { logout } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../Hooks/useLogin";
import { useSelector } from "react-redux";
import { userSelect } from "../../redux/slices/userslice";

const DashboardLayout = (props) => {
  const { children } = props;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toogleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <>
      {/* navbar */}
      <Navbar
        handleToogle={toogleDropDown}
        isDropDownOpenToogle={isDropDownOpen}
        handleLogoutMenu={handleLogout}
      />

      {/* sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* main page */}
      {children}
    </>
  );
};

export default DashboardLayout;
