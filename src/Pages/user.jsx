import DashboardLayout from "../Components/Layouts/DashboardLayout";
import TableUser from "../Components/Fragments/TableUser";
import useTitleBrowser from "../Hooks/useTitle";

const UserListPage = () => {
  useTitleBrowser("Daftar Guru");
  return (
    <>
      <DashboardLayout>
        {/* main page */}
        <div className="p-4 sm:ml-64">
          <div className="p-3 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex justify-center h-full p-1 mb-4 bg-gray-800 rounded-lg">
              {/* tabel */}
              <TableUser />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserListPage;
