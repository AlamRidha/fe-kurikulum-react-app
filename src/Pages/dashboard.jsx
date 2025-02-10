import DashboardLayout from "../Components/Layouts/DashboardLayout";
import { Outlet } from "react-router-dom";

const DashbordPage = () => {
  return (
    <DashboardLayout>
      {/* main page */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashbordPage;
