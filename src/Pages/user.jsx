import DashboardLayout from "../Components/Layouts/DashboardLayout";
import TableUser from "../Components/Fragments/TableUser";

const UserListPage = () => {
  return (
    <>
      <DashboardLayout>
        {/* main page */}
        <div className="p-4 sm:ml-64">
          <div className="p-3 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex p-1 justify-center h-full mb-4 rounded-lg bg-gray-800">
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
