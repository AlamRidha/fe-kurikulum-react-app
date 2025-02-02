import { useEffect, useState } from "react";
import SearchBar from "../Elements/SearchBar";
import Table from "../Table";
import Button from "../Elements/Button";
import {
  deleteDataProfilPelajar,
  getAllDataProfilPelajar,
} from "../../Services/ppelajar.service";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { filteredData } from "../../helper/filteredsearch";
import ModalForm from "./Modal";
import {
  formatDisplayText,
  formatSeparatedText,
} from "../../helper/formattedtext";
import FormProfilPelajar from "./FormProfilPelajar";

export const TabelProfilPelajar = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showData, setShowData] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProfilPelajar, setEditingProfilPelajar] = useState(null);

  const loadData = () => {
    getAllDataProfilPelajar((status, res) => {
      if (status) {
        // set data here
        setData(res);
      } else {
        // error
        console.error("Error load data ", res);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data profil pelajar ini? "
    );
    if (!isConfirmed) return;

    deleteDataProfilPelajar(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idProfil !== id));
        alert("Data berhasil dihapus");
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
  };

  const handleShowItem = (id) => {
    const dataToShow = data.find((item) => item.idProfil === id);
    const formattedData = {
      ...dataToShow,
      elemen: formatSeparatedText(dataToShow.elemen, "\n"),
    };
    console.log(formattedData);
    setShowData(formattedData);
    setIsShowModalOpen(true);
    // getDataById(id, (status, res) => {
    //   if (status) {
    //     console.log(res);
    //     setShowData(data);
    //   } else {
    //     console.error("Error response ", res);
    //   }
    // });
  };

  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleOnSubmit = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  // get id
  const handleEdit = (id) => {
    const dataToEdit = data.find((item) => item.idProfil === id);
    setEditingProfilPelajar(dataToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  //Toggle edit
  const handleEditModal = () => {
    setIsEditModalOpen(false);
  };

  //Toggle show
  const handleShowItemModal = () => {
    setIsShowModalOpen(false);
  };

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // filter data with search
  const filter = filteredData(data, searchQuery);

  // header table
  const myHeaders = [
    { key: "dimensi", label: "Dimensi" },
    { key: "elemen", label: "Elemen" },
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
            placeholder="Cari Profil Pelajar"
          />

          <Button
            classname="px-2 ml-2 bg-blue-600"
            type="button"
            onClick={handleCreateModal}
          >
            Tambah Data
          </Button>
        </div>

        {isCreateModalOpen && (
          <FormProfilPelajar
            onSubmitSuccess={handleOnSubmit}
            handleClose={handleCreateModal}
            isEditing={false}
            title="Tambah Profil Pelajar"
          />
        )}

        {isEditModalOpen && (
          <FormProfilPelajar
            onSubmitSuccess={handleEditSuccess}
            initialData={editingProfilPelajar}
            handleClose={handleEditModal}
            isEditing
            title="Edit Profil Pelajar"
          />
        )}

        {isShowModalOpen && (
          <ModalForm
            closeModal={handleShowItemModal}
            title="Data Profil Pelajar"
            closeButton="Tutup"
          >
            {showData ? (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Dimensi</h3>
                  <p className="px-3 py-2 bg-gray-100 rounded-md">
                    {showData.dimensi}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Sub Elemen</h3>
                  <ol className="pl-5 ">
                    {showData.elemen.map((item, index) => (
                      <li key={index} className="mb-2">
                        <p className="px-3 py-2 bg-gray-100 rounded-md">
                          {formatDisplayText(item, { uppercase: true })}
                        </p>
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
          {filter.length > 0 ? (
            filter.map((item, index) => (
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

                <td className="p-4 text-base font-medium">{item.dimensi}</td>
                <td className="p-4 text-center ">
                  <Button
                    classname="inline-flex px-2 duration-300 ease-in-out border text-slate-950 border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleShowItem(item.idProfil)}
                  >
                    <LiaVoteYeaSolid className="w-6 h-6 mr-1" />
                    Lihat Elemen
                  </Button>
                </td>

                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idProfil)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idProfil)}
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
    </div>
  );
};

export default TabelProfilPelajar;
