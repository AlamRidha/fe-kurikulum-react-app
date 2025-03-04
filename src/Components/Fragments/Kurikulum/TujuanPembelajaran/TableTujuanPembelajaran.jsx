import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteTujuanPembelajaran,
  getTujuanPembelajaran,
} from "../../../../Services/tujuanpembelajaran";
import Button from "../../../Elements/Button";
import FormTujuanPembelajaran from "./FormTujuanPembelajaran";
import { formatDisplayText } from "../../../../helper/formattedtext";
import ModalForm from "../../Modal";
import Table from "../../../Table";

const TableCapaianPembelajaran = () => {
  const { idMp } = useParams();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(5);
  const [showData, setShowData] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTujuanPembelajaran, setEditingTujuanPembelajaran] =
    useState(null);

  const loadData = () => {
    getTujuanPembelajaran(idMp, (status, res) => {
      if (status) {
        // grouped data by elemen capaian
        const groupedData = (data) => {
          return data.reduce((acc, item) => {
            const namaCapaian = item.capaian_pembelajaran
              ? item.capaian_pembelajaran.elemen
              : `ID ${item.idCp}`;

            if (!acc[namaCapaian]) {
              acc[namaCapaian] = [];
            }

            acc[namaCapaian].push(item);
            return acc;
          }, {});
        };

        const dataGroup = groupedData(res.data);
        setData(dataGroup);
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
    { key: "elemen_capaian", label: "Elemen Capaian" },
    { key: "tujuan_pembelajaran", label: "Tujuan Pembelajaran" },
  ];

  // Toggle create
  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleDataCreated = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  //Toggle edit
  const handleEditModal = () => {
    setIsEditModalOpen(false);
  };

  // get id
  const handleEdit = (id) => {
    // Object values to get all array in data
    // flat make all array to one array
    const allItems = Object.values(data).flat();

    const dataEdit = allItems.find((item) => item.idTp === id);

    setEditingTujuanPembelajaran(dataEdit);
    setIsEditModalOpen(true);
  };

  const onEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  // function delete
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini? "
    );
    if (!isConfirmed) return;

    deleteTujuanPembelajaran(id, (status, res) => {
      if (status) {
        // Delete item from object grouped data
        setData((prevData) => {
          const newData = { ...prevData };

          // Looping every element capaian for find and delete item
          Object.keys(newData).forEach((key) => {
            newData[key] = newData[key].filter((item) => item.idTp !== id);

            // delete category if empty use "delete"
            if (newData[key].length === 0) {
              delete newData[key];
            }
          });

          return newData;
        });
        alert("Data berhasil dihapus");
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
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
          <FormTujuanPembelajaran
            handleClose={handleCreateModal}
            onSubmitSuccess={handleDataCreated}
            isEditing={false}
            title="Tambah Data Tujuan Pembelajaran"
            idMataPelajaran={idMp}
          />
        )}

        {/* Modal for edit data */}
        {isEditModalOpen && (
          <FormTujuanPembelajaran
            handleClose={handleEditModal}
            initialData={editingTujuanPembelajaran}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Tujuan Pembelajaran"
          />
        )}

        {/* table */}
        <Table header={myHeaders} action>
          {Object.keys(data).length > 0 ? (
            <>
              {Object.keys(data).map((elemenCapaian, groupIndex) => {
                const groupItems = data[elemenCapaian];
                const groupLength = groupItems.length;

                return groupItems.map((item, itemIndex) => (
                  <tr
                    key={item.idTp || `${groupIndex}-${itemIndex}`}
                    className={`border-b border-gray-700 hover:bg-gray-600 ${
                      itemIndex === groupLength - 1
                        ? "border-b-2 border-gray-500"
                        : ""
                    }`}
                  >
                    {/* Nomor urut dengan rowspan untuk setiap grup */}
                    {itemIndex === 0 && (
                      <th
                        rowSpan={groupLength}
                        scope="row"
                        className="font-medium text-center text-white align-middle bg-gray-700 whitespace-nowrap w-14"
                      >
                        {groupIndex + 1}
                      </th>
                    )}

                    {/* Elemen Capaian dengan rowspan untuk setiap grup */}
                    {itemIndex === 0 && (
                      <td
                        rowSpan={groupLength}
                        className="p-4 font-medium text-gray-100 align-middle bg-gray-800"
                      >
                        {elemenCapaian}
                      </td>
                    )}

                    {/* Tujuan Pembelajaran - setiap baris */}
                    <td className="p-4 bg-gray-800">
                      <div className="flex">
                        {/* <span className="mr-2 font-bold text-gray-400">
                          {itemIndex + 1}.
                        </span> */}
                        <span>{item.tujuan_pembelajaran}</span>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="flex items-center justify-center h-full px-5 py-4 text-center bg-gray-800">
                      <Button
                        onClick={() => handleEdit(item.idTp)}
                        classname="px-3 py-1 mr-2 font-light text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.idTp)}
                        classname="px-3 py-1 font-light text-white bg-red-500 rounded-md hover:bg-red-600"
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ));
              })}
            </>
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

export default TableCapaianPembelajaran;
