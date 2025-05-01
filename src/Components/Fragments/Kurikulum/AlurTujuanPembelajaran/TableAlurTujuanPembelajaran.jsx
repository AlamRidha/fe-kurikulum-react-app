import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteAlurTujuanPembelajaran,
  getAlurTujuanPembelajaran,
} from "../../../../Services/alurtujuanpembelajaran";
import Button from "../../../Elements/Button";
import Table from "../../../Table";
import { LiaVoteYeaSolid } from "react-icons/lia";
import FormAlurTujuanPembelajaran from "./FormAlurTujuanPembelajaran";
import ModalForm from "../../Modal";
import { formatDisplayText } from "../../../../helper/formattedtext";

const TableAlurTujuanPembelajaran = () => {
  const { idMp } = useParams();

  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAlurTujuanPembelajaran, setEditingAlurTujuanPembelajaran] =
    useState(null);

  const loadData = () => {
    getAlurTujuanPembelajaran(idMp, (status, res) => {
      if (status) {
        setData(res.data);
      } else {
        console.error("Error get data", res);
      }
    });
  };

  useEffect(() => loadData(), []);

  const myHeaders = [
    { key: "tahap", label: "Tahap" },
    { key: "alur_tujuan_pembelajaran", label: "Alur Tujuan Pembelajaran" },
  ];

  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleDataCreated = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  const handleShowItemModal = () => {
    setIsShowModalOpen(false);
  };

  const handleShowItem = (id) => {
    const dataToShow = data.find((item) => item.idAtp === id);
    if (!dataToShow) return;

    console.log(dataToShow);
    try {
      setShowData({
        ...dataToShow,
        alur_tujuan_pembelajaran: JSON.parse(
          dataToShow.alur_tujuan_pembelajaran
        ),
      });
      setIsShowModalOpen(true);
    } catch (error) {
      setShowData({ ...dataToShow, alur_tujuan_pembelajaran: [] });
      setIsShowModalOpen(true);
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini? "
    );
    if (!isConfirmed) return;

    deleteAlurTujuanPembelajaran(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idCp !== id));
        alert("Data berhasil dihapus");
        loadData();
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
  };

  const handleEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = (id) => {
    const dataToEdit = data.find((item) => item.idAtp === id);

    setEditingAlurTujuanPembelajaran(dataToEdit);
    setIsEditModalOpen(true);
  };

  const onEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col">
        {/* searching table */}
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
          <FormAlurTujuanPembelajaran
            handleClose={handleCreateModal}
            onSubmitSuccess={handleDataCreated}
            isEditing={false}
            title="Tambah Data Capaian Pembelajaran"
            idMp={idMp}
          />
        )}

        {/* Modal for edit data */}
        {isEditModalOpen && (
          <FormAlurTujuanPembelajaran
            handleClose={handleEditModal}
            initialData={editingAlurTujuanPembelajaran}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Alur Tujuan Pembelajaran"
            idMp={idMp}
          />
        )}

        {/* Modal for show data */}
        {isShowModalOpen && (
          <ModalForm
            closeModal={handleShowItemModal}
            title="Data Alur Tujuan Pembelajaran"
            closeButton="Tutup"
          >
            {showData ? (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Tahap</h3>
                  <p className="px-3 py-2 bg-gray-100 rounded-md">
                    {formatDisplayText(showData.tahap, { uppercase: true })}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Alur Tujuan Pembelajaran
                  </h3>
                  <ol className="pl-5 ">
                    {Array.isArray(showData.alur_tujuan_pembelajaran) &&
                      showData.alur_tujuan_pembelajaran.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                  </ol>
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
          {/* Cek data if exist show the data */}
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
                <td className="p-4">{item.tahap}</td>
                <td className="p-4 text-center">
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleShowItem(item.idAtp)}
                  >
                    <LiaVoteYeaSolid className="w-6 h-6 mr-1" />
                    Lihat Data
                  </Button>
                </td>
                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idAtp)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idAtp)}
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

export default TableAlurTujuanPembelajaran;
