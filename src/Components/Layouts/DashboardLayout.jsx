import { useState } from "react";
import Navbar from "../Fragments/Navbar";
import Sidebar from "../Fragments/Sidebar";

const DashboardLayout = (props) => {
  const { children } = props;
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
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
