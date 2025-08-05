import TableDokumenKurikulum from "../Components/Fragments/Dokumen/TableDokumenKurikulum";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import useTitleBrowser from "../Hooks/useTitle";

const DokumenKurikulumPage = () => {
  useTitleBrowser("Dokumen Kurikulum");
  return (
    <DashboardLayout>
      <div className="p-4 sm:ml-64">
        <div className="p-3 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex justify-center h-full p-1 mb-4 bg-gray-800 rounded-lg">
            <TableDokumenKurikulum />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DokumenKurikulumPage;
