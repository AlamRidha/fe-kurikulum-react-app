import DashboardLayout from "../Components/Layouts/DashboardLayout";
import useLogin from "../Hooks/useLogin";

const DashbordPage = () => {
  const userData = useLogin();

  return (
    <DashboardLayout>
      {/* main page */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex items-center justify-center h-screen mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              Halaman Dashboard Selamat Datang {userData?.nameUser}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashbordPage;
