import { useEffect, useState } from "react";
import {
  deleteDokumenKurikulum,
  getAllDokumenKurikulum,
} from "../../../Services/dokumenkurikulum";
import { filteredData } from "../../../helper/filteredsearch";
import SearchBar from "../../Elements/SearchBar";
import Button from "../../Elements/Button";
import FormDataKurikulum from "./FormDataKurikulum";
import Table from "../../Table";
import { formatDisplayText } from "../../../helper/formattedtext";
import { FaLink } from "react-icons/fa";
import ModalPDFViewer from "../../Elements/ModalPDFViewer/ModalPDF";

const TableDokumenKurikulum = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDataKurikulum, setEditingDataKurikulum] = useState(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [selectedPDFUrl, setSelectedPDFUrl] = useState("");

  const loadData = () => {
    getAllDokumenKurikulum((status, res) => {
      if (status) {
        console.log(res.data);
        setData(res.data);
      } else {
        console.error("Error get data", res);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data buku ini? "
    );
    if (!isConfirmed) return;

    deleteDokumenKurikulum(id, (status, res) => {
      if (status) {
        setData((prevData) =>
          prevData.filter((item) => item.idKurikulum !== id)
        );
        alert("Data berhasil dihapus");
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
  };

  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleOnSubmit = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  // get id
  const handleEdit = (id) => {
    const dataToEdit = data.find((item) => item.idKurikulum === id);

    setEditingDataKurikulum(dataToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  //Toggle edit
  const handleEditModal = () => setIsEditModalOpen(false);
  // search
  const handleSearch = (e) => setSearchQuery(e.target.value);

  // filter data with search
  const filter = filteredData(data, searchQuery);

  // handle view pdf
  const handleViewPDF = (url) => {
    setSelectedPDFUrl(url);
    setIsPDFModalOpen(true);
  };

  // header table
  const myHeaders = [
    { key: "namaKurikulum", label: "Nama Kurikulum" },
    { key: "tahun", label: "Tahun" },
    { key: "linkKurikulum", label: "Link" },
  ];

  return (
    <div>
      <div className="flex flex-col">
        {/* searching table */}
        <div className="flex justify-end w-full pr-2 mt-2 mb-4">
          {/* Search Bar */}
          <SearchBar
            query={searchQuery}
            onSearch={handleSearch}
            placeholder="Cari Kurikulum"
          />

          <Button
            classname="px-2 ml-2 text-white bg-blue-600"
            type="button"
            onClick={handleCreateModal}
          >
            Tambah Data
          </Button>
        </div>

        {isCreateModalOpen && (
          <FormDataKurikulum
            onSubmitSuccess={handleOnSubmit}
            handleClose={handleCreateModal}
            isEditing={false}
            title="Tambah Dokumen Kurikulum"
          />
        )}

        {isEditModalOpen && (
          <FormDataKurikulum
            onSubmitSuccess={handleEditSuccess}
            initialData={editingDataKurikulum}
            handleClose={handleEditModal}
            isEditing
            title="Edit Dokumen Kurikulum"
          />
        )}

        {/* table */}
        <Table header={myHeaders} action>
          {/* Cek data if exist show the data */}
          {filter.length > 0 ? (
            filter.map((item, index) => (
              <tr
                key={item.idKurikulum || index}
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 "
              >
                <th
                  scope="row"
                  className="font-medium text-center text-white whitespace-nowrap w-14"
                >
                  {index + 1}
                </th>

                <td className="p-4 text-base font-medium">
                  {formatDisplayText(item.namaKurikulum, { capitalize: true })}
                </td>

                <td className="p-4 text-base font-medium text-center">
                  {formatDisplayText(item.tahun, { capitalize: true })}
                </td>
                <td className="p-4 text-center ">
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleViewPDF(item.linkKurikulum)}
                  >
                    <FaLink className="w-4 h-4 mr-1" />
                    Lihat Dokumen
                  </Button>
                </td>

                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idKurikulum)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idKurikulum)}
                    classname="mr-2 font-light text-red-600 bg-red-500 dark:text-red-100"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={myHeaders.length + 2} className="px-6 py-8 text-2xl">
                Tidak ada data tersedia.
              </td>
            </tr>
          )}
        </Table>
      </div>

      {isPDFModalOpen && (
        <ModalPDFViewer
          isOpen={isPDFModalOpen}
          onClose={() => setIsPDFModalOpen(false)}
          fileUrl={selectedPDFUrl}
        />
      )}
    </div>
  );
};

export default TableDokumenKurikulum;
