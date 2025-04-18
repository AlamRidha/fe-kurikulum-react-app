import { useEffect, useState } from "react";
import Table from "../Table";
import useLogin from "../../Hooks/useLogin";
import { deleteUser, getAllData } from "../../Services/user.service";
import Button from "../Elements/Button";
import {
  getPaginationRange,
  usePagination,
} from "../../helper/paginationtable";
import FormUser from "./FormUser";
import SearchBar from "../Elements/SearchBar";

const TableUser = () => {
  const userData = useLogin();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(8);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // loadData
  const loadData = () => {
    getAllData((status, res) => {
      if (status) {
        const datas = res.data;
        // cek if user login is not admin set data
        if (userData?.nip !== "admin") {
          const dataUser = datas.filter((item) => item.nip !== "admin");
          setData(dataUser);
        } else {
          setData(res.data);
        }
      } else {
        console.log("Error get data");
      }
    });
  };

  // mounted
  useEffect(() => {
    loadData();
  }, [userData]);

  // function delete
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus akun guru ini? "
    );
    if (!isConfirmed) return;

    deleteUser(id, (status, res) => {
      if (status) {
        setData((prevData) => prevData.filter((item) => item.idUser !== id));
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
    const dataToEdit = data.find((item) => item.idUser === id);
    setEditingUser(dataToEdit);
    setIsEditModalOpen(true);
  };

  const onEditSuccess = () => {
    loadData();
    setIsEditModalOpen(false);
  };

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

  const myHeaders = [
    { key: "nip", label: "NIP" },
    { key: "nameUser", label: "Nama Guru" },
    { key: "email", label: "Email" },
    { key: "noHp", label: "No Hp" },
    { key: "bidangMataPelajaran", label: "Bidang Mapel" },
  ];

  return (
    <>
      <div className="flex flex-col">
        {/* searching table */}
        <div className="flex justify-end w-full pr-2 mt-2 mb-4">
          {/* Search Bar */}
          <SearchBar
            query={searchQuery}
            onSearch={handleSearch}
            placeholder="Cari Guru"
          />

          <Button
            classname="px-2 ml-2 text-white bg-blue-600"
            type="button"
            onClick={handleCreateModal}
          >
            Tambah User
          </Button>
        </div>

        {/* Modal for add new user */}
        {isCreateModalOpen && (
          <FormUser
            handleClose={handleCreateModal}
            onSubmitSuccess={handleUserCreated}
            isEditing={false}
            title="Tambah Data Guru"
          />
        )}

        {/* Modal for edit user */}
        {isEditModalOpen && (
          <FormUser
            handleClose={handleEditModal}
            initialData={editingUser}
            isEditing
            onSubmitSuccess={onEditSuccess}
            title="Edit Data Guru"
          />
        )}

        {/* table */}
        <Table header={myHeaders} action={userData?.nip === "admin"}>
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

                <td className="p-4">{item.nip}</td>
                <td className="p-4">{item.nameUser}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.noHp}</td>
                <td className="p-4">{item.bidangMataPelajaran}</td>

                {/* cek if login is admin show the action button */}
                {userData?.nip === "admin" && (
                  <td className="flex items-center justify-center h-full px-5 py-4 text-center">
                    <Button
                      onClick={() => handleEdit(item.idUser)}
                      classname="mr-2 font-light text-blue-600 bg-blue-600 dark:text-blue-100"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.idUser)}
                      classname="mr-5 font-light text-red-600 bg-red-500 dark:text-red-100 hover:underline"
                    >
                      Hapus
                    </Button>
                  </td>
                )}
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

export default TableUser;
