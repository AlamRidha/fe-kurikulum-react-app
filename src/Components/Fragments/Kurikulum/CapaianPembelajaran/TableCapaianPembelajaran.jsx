import { useEffect, useState } from "react";
import {
  deleteCapaianPembelajaran,
  getCapaianPembelajaran,
} from "../../../../Services/capaianpembelajaran.service";
import { useParams } from "react-router-dom";
import SearchBar from "../../../Elements/SearchBar";
import Button from "../../../Elements/Button";
import Table from "../../../Table";
import {
  getPaginationRange,
  usePagination,
} from "../../../../helper/paginationtable";
import FormCapaianPembelajaran from "./FormCapaianPembelajaran";
import { LiaVoteYeaSolid } from "react-icons/lia";
import { formatDisplayText } from "../../../../helper/formattedtext";
import ModalForm from "../../Modal";

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
  const [editingCapaianPembelajaran, setEditingCapaianPembelajaran] =
    useState(null);

  const loadData = () => {
    getCapaianPembelajaran(idMp, (status, res) => {
      if (status) {
        setData(res.data);
      } else {
        console.error("Error get data", res);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // function delete
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini? "
    );
    if (!isConfirmed) return;

    deleteCapaianPembelajaran(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idCp !== id));
        alert("Data berhasil dihapus");
      } else {
        console.error("Error menghapus data", res);
        alert("Gagal menghapus data");
      }
    });
  };

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Toggle create
  const handleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  const handleUserCreated = () => {
    loadData();
    setIsCreateModalOpen(false);
  };

  //Toggle edit
  const handleEditModal = () => {
    setIsEditModalOpen(false);
  };

  // get id
  const handleEdit = (id) => {
    const dataToEdit = data.find((item) => item.idCp === id);

    setEditingCapaianPembelajaran(dataToEdit);
    setIsEditModalOpen(true);
  };

  const onEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  //   headers
  const myHeaders = [
    { key: "elemen", label: "Elemen" },
    { key: "capaianpembelajaran", label: "Capaian Pembelajaran" },
  ];

  // filter data with search
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // use helper pagination
  const {
    currentItems,
    totalPages,
    showingFrom,
    showingTo,
    totalItems,
    hasNextPage,
    hasPrevPage,
  } = usePagination(filteredData, currentPage, itemsPerPage);

  // get visible number
  const visiblePages = getPaginationRange(currentPage, totalPages);

  // change page
  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () =>
    hasNextPage && setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () =>
    hasPrevPage && setCurrentPage((prev) => prev - 1);

  //Toggle show
  const handleShowItemModal = () => {
    setIsShowModalOpen(false);
  };

  const handleShowItem = (id) => {
    const dataToShow = data.find((item) => item.idCp === id);
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
          {/* Search Bar */}
          <SearchBar
            query={searchQuery}
            onSearch={handleSearch}
            placeholder="Cari Data"
          />

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
          <FormCapaianPembelajaran
            handleClose={handleCreateModal}
            onSubmitSuccess={handleUserCreated}
            isEditing={false}
            title="Tambah Data Capaian Pembelajaran"
            idMp={idMp}
          />
        )}

        {/* Modal for edit data */}
        {isEditModalOpen && (
          <FormCapaianPembelajaran
            handleClose={handleEditModal}
            initialData={editingCapaianPembelajaran}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Capaian Pembelajaran"
          />
        )}

        {/* Modal for show data */}
        {isShowModalOpen && (
          <ModalForm
            closeModal={handleShowItemModal}
            title="Data Capaian Pembelajaran"
            closeButton="Tutup"
          >
            {showData ? (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Elemen</h3>
                  <p className="px-3 py-2 bg-gray-100 rounded-md">
                    {formatDisplayText(showData.elemen, { uppercase: true })}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Capaian Pembelajaran
                  </h3>
                  <ol className="pl-5 ">
                    {formatDisplayText(showData.capaian_pembelajaran, {
                      uppercase: true,
                    })}
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
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
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
                <td className="p-4">{item.elemen}</td>
                <td className="p-4">
                  {" "}
                  <Button
                    classname="inline-flex px-2 text-gray-800 duration-300 ease-in-out border border-slate-950 bg-stone-100 hover:text-stone-50 hover:border-stone-50 hover:bg-slate-900"
                    onClick={() => handleShowItem(item.idCp)}
                  >
                    <LiaVoteYeaSolid className="w-6 h-6 mr-1" />
                    Lihat Elemen
                  </Button>
                </td>
                <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                  <Button
                    onClick={() => handleEdit(item.idCp)}
                    classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.idCp)}
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

        <Table.PaginationTable
          showingFrom={showingFrom}
          showingTo={showingTo}
          totalItems={totalItems}
          onPrevPage={handlePrevPage}
          hasPrevPage={hasPrevPage}
          visiblePages={visiblePages}
          onNextPage={handleNextPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          onPaginate={handlePaginate}
        />
      </div>
    </>
  );
};

export default TableCapaianPembelajaran;
