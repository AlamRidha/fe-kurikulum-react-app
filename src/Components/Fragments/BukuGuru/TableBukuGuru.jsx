import { useEffect, useState } from "react";
import { formatDisplayText } from "../../../helper/formattedtext";
import {
  deleteDataBukuGuru,
  getAllDataBukuGuru,
} from "../../../Services/bukuguru";
import Button from "../../Elements/Button";
import SearchBar from "../../Elements/SearchBar";
import Table from "../../Table";
import { filteredData } from "../../../helper/filteredsearch";
import { LiaVoteYeaSolid } from "react-icons/lia";
import FormDataBuku from "./FormDataBuku";
import { FaLink } from "react-icons/fa";

const TableBuku = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDataBuku, setEditingDataBuku] = useState(null);

  const loadData = () => {
    getAllDataBukuGuru((status, res) => {
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

    deleteDataBukuGuru(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idBuku !== id));
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
    const dataToEdit = data.find((item) => item.idBuku === id);

    if (!dataToEdit) return;

    const parsedElement =
      typeof dataToEdit.elemen === "string"
        ? JSON.parse(dataToEdit.elemen).map((item) =>
            typeof item === "string" ? item.replace(/^"|"$/g, "") : item
          )
        : dataToEdit.elemen;

    const formattedData = {
      ...dataToEdit,
      elemen: parsedElement,
    };

    setEditingDataBuku(formattedData);
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

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // filter data with search
  const filter = filteredData(data, searchQuery);

  // header table
  const myHeaders = [
    { key: "dimensi", label: "Dimensi" },
    { key: "linkBuku", label: "Link Buku" },
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
            placeholder="Cari Buku"
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
          <FormDataBuku
            onSubmitSuccess={handleOnSubmit}
            handleClose={handleCreateModal}
            isEditing={false}
            title="Tambah Buku"
          />
        )}

        {isEditModalOpen && (
          <FormDataBuku
            onSubmitSuccess={handleEditSuccess}
            initialData={editingDataBuku}
            handleClose={handleEditModal}
            isEditing
            title="Edit Buku"
          />
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

                <td className="p-4 text-base font-medium">
                  {formatDisplayText(item.namaBuku, { capitalize: true })}
                </td>
                <td className="p-4 text-center ">
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => window.open(item.linkBuku)}
                  >
                    <FaLink className="w-4 h-4 mr-1" />
                    Lihat Buku
                  </Button>
                </td>

                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idBuku)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idBuku)}
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

export default TableBuku;
