import { LiaVoteYeaSolid } from "react-icons/lia";
import Button from "../../../Elements/Button";
import Table from "../../../Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteModulPembelajaran,
  getAllModulPembelajaran,
} from "../../../../Services/modulpembelajaran";
import FormModulPembelajaran from "./FormModulPembelajaran";
import ModalForm from "../../Modal";

const TableModulPembelajaran = () => {
  const { idMp } = useParams();

  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingModulPembelajaran, setEditingModulPembelajaran] =
    useState(null);

  const loadData = () => {
    getAllModulPembelajaran(idMp, (status, res) => {
      if (status) {
        setData(res.data);
        console.log(res.data);
      } else {
        console.error("Error get data", res);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  //   headers
  const myHeaders = [
    { key: "bab", label: "Bab" },
    { key: "teman", label: "Tema" },
    { key: "alokasi_waktu", label: "Alokasi Waktu" },
    { key: "deskripsi_cp", label: "Detail" },
  ];

  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleDataCreated = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  const handleEditModal = () => {
    setIsEditModalOpen(false);
  };

  // get id
  const handleEdit = (id) => {
    const dataToEdit = data.find((item) => item.idModul === id);

    setEditingModulPembelajaran(dataToEdit);
    setIsEditModalOpen(true);
  };

  const onEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini? "
    );
    if (!isConfirmed) return;

    deleteModulPembelajaran(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idModul !== id));
        alert("Data berhasil dihapus");
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
  };

  const handleShowItemModal = () => {
    setIsShowModalOpen(false);
  };

  const handleShowItem = (id) => {
    const dataToShow = data.find((item) => item.idModul === id);
    if (!dataToShow) return;

    try {
      console.log(dataToShow);
      setShowData({
        ...dataToShow,
        profil_pancasila: JSON.parse(dataToShow.profil_pancasila),
      });
      setIsShowModalOpen(true);
    } catch (error) {
      setShowData({ ...dataToShow });
      setIsShowModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end w-full pr-2 mt-2 mb-4">
          <Button
            classname="px-2 ml-2 text-white bg-blue-600"
            type="button"
            onClick={handleCreateModal}
          >
            Tambah Data
          </Button>
        </div>

        {/* Modal for create data */}
        {isCreateModalOpen && (
          <FormModulPembelajaran
            handleClose={handleCreateModal}
            onSubmitSuccess={handleDataCreated}
            isEditing={false}
            title="Tambah Data Modul Pembelajaran"
            idMp={idMp}
          />
        )}

        {/* Modal for edit data */}
        {isEditModalOpen && (
          <FormModulPembelajaran
            handleClose={handleEditModal}
            initialData={editingModulPembelajaran}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Modul Pembelajaran"
            idMp={idMp}
          />
        )}

        {/* Modal for show data */}
        {isShowModalOpen && (
          <ModalForm
            closeModal={handleShowItemModal}
            title="Data Modul Pembelajaran"
            closeButton="Tutup"
          >
            {showData ? (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nama Bab
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.bab}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tema
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.tema}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Alokasi Waktu
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.alokasi_waktu}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Sarana & Prasarana
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.sarana_prasarana}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Tujuan Bab
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.tujuan_bab}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Model Pembelajaran
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.model_pembelajaran}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Kompetensi Awal
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.kompetensi_awal}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Pemahaman
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.pemahaman}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Deskripsi Capaian Pembelajaran
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {showData.deskripsi_cp}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Profil Pelajar Pancasila
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    <ol className="pl-1 ">
                      {Array.isArray(showData.profil_pancasila) &&
                        showData.profil_pancasila.map((item, index) => (
                          <li key={index} className="mb-2">
                            {index + 1}. {item}
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Kegiatan Pembelajaran
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    <p className="px-3 py-2 whitespace-pre-wrap bg-gray-100 rounded-md">
                      {showData.kegiatan_pembelajaran}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">Tidak Ada Data Tersedia</p>
              </div>
            )}
          </ModalForm>
        )}

        {/* table */}
        <Table header={myHeaders} action>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 "
              >
                <th
                  scope="row"
                  className="font-medium text-center text-white whitespace-nowrap w-14"
                >
                  {index + 1}
                </th>
                <td className="p-4">{item.bab}</td>
                <td className="p-4">{item.tema}</td>
                <td className="p-4 text-center">{item.alokasi_waktu}</td>
                <td className="p-4 text-center">
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleShowItem(item.idModul)}
                  >
                    <LiaVoteYeaSolid className="w-6 h-6 mr-1" />
                    Lihat Data
                  </Button>
                </td>
                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idModul)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idModul)}
                    classname="mr-5 font-light text-red-600 bg-red-500 dark:text-red-100 hover:underline"
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
    </>
  );
};

export default TableModulPembelajaran;
