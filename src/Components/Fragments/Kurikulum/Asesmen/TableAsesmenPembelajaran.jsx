import { useParams } from "react-router-dom";
import Button from "../../../Elements/Button";
import Table from "../../../Table";
import { useEffect, useState } from "react";
import { getAsesmenPembelajaran } from "../../../../Services/asesmen";
import { LiaVoteYeaSolid } from "react-icons/lia";
import FormAsesmen from "./FormAsesmenPembelajaran";
import { deleteAsesmenPembelajaran } from "../../../../Services/asesmen";
import ModalForm from "../../Modal";
import { formatDisplayText } from "../../../../helper/formattedtext";

const TableAsesmenPembelajaran = () => {
  const { idMp } = useParams();
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAsesmen, setEditingAsesmen] = useState(null);

  const myHeaders = [
    { key: "namaBab", label: "Nama Bab" },
    { key: "jenisAsesmen", label: "Jenis Asesmen" },
    { key: "keterangan", label: "Detail" },
  ];

  const loadData = () => {
    getAsesmenPembelajaran(idMp, (status, res) => {
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
    const dataToEdit = data.find((item) => item.idAsesmen === id);

    setEditingAsesmen(dataToEdit);
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

    deleteAsesmenPembelajaran(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idAsesmen !== id));
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
    const dataToShow = data.find((item) => item.idAsesmen === id);
    if (!dataToShow) return;

    try {
      setShowData(dataToShow);
      setIsShowModalOpen(true);
    } catch (error) {
      setShowData({ ...dataToShow, elemen: [] });
      setIsShowModalOpen(true);
    }
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
          <FormAsesmen
            handleClose={handleCreateModal}
            onSubmitSuccess={handleDataCreated}
            isEditing={false}
            title="Tambah Data Asesmen"
            idMp={idMp}
          />
        )}

        {/* Modal for edit data */}
        {isEditModalOpen && (
          <FormAsesmen
            handleClose={handleEditModal}
            initialData={editingAsesmen}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Asesmen"
            idMp={idMp}
          />
        )}

        {/* Modal for show data */}
        {isShowModalOpen && (
          <ModalForm
            closeModal={handleShowItemModal}
            title="Data Asesmen"
            closeButton="Tutup"
          >
            {showData ? (
              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Nama Bab
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {formatDisplayText(showData.namaBab)}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Jenis Asesmen
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {formatDisplayText(showData.jenisAsesmen)}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Bentuk Asesmen
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    {formatDisplayText(showData.bentukAsesmen)}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Keterangan
                  </label>
                  <div className="p-2 bg-gray-100 border rounded">
                    <p className="px-3 py-2 whitespace-pre-wrap bg-gray-100 rounded-md">
                      {formatDisplayText(showData.keterangan, {
                        uppercase: true,
                      })}
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
                <td className="p-4">{item.namaBab}</td>
                <td className="p-4">{item.jenisAsesmen}</td>
                <td className="p-4 text-center">
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleShowItem(item.idAsesmen)}
                  >
                    <LiaVoteYeaSolid className="w-6 h-6 mr-1" />
                    Lihat Data
                  </Button>
                </td>
                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idAsesmen)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idAsesmen)}
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

export default TableAsesmenPembelajaran;
