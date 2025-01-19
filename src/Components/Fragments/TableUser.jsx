import { useEffect, useState } from "react";
import Table from "../Table";
import useLogin from "../../Hooks/useLogin";
import { getAllData } from "../../Services/user.service";
import Button from "../Elements/Button";
import { getPaginationRange, usePagination } from "../../helper";
import FormUser from "./FormUser";

const TableUser = () => {
  const userData = useLogin();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // function edit
  const handleEdit = (id) => {
    const editData = data.filter((item) => item.idUser === id);
    console.log("Ini Edit", id, "Cek data ", editData);
  };

  // function delete
  const handleDelete = (id) => {
    console.log("Ini Hapus", id);
  };

  // search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleUserCreated = () => {
    loadData();
    setIsModalOpen(false);
  };

  // Open Modal
  const handleOpen = () => setIsModalOpen(!isModalOpen);

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => hasNextPage && setCurrentPage((prev) => prev + 1);
  const prevPage = () => hasPrevPage && setCurrentPage((prev) => prev - 1);

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
        <div className="flex justify-end mb-4 pr-2 mt-2 w-full">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <Button
            classname="bg-blue-600 px-2 ml-2"
            type="button"
            onClick={handleOpen}
          >
            Tambah User
          </Button>
        </div>

        {/* Modal for add new user */}
        {isModalOpen && (
          <FormUser
            handleOpen={handleOpen}
            handleClose={handleOpen}
            onCreateUser={handleUserCreated}
          ></FormUser>
        )}

        {/* table */}
        <Table header={myHeaders} action={userData?.nip === "admin"}>
          {/* Cek data if exist show the data */}
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 "
              >
                <th
                  scope="row"
                  className="text-center font-medium whitespace-nowrap text-white w-14"
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
                  <td className="flex items-center justify-center px-5 py-4 text-center h-full">
                    <Button
                      onClick={() => handleEdit(item.idUser)}
                      classname="font-light mr-2 bg-blue-600 text-blue-600  dark:text-blue-100"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.idUser)}
                      classname="font-light mr-5 bg-red-500 text-red-600 dark:text-red-100 hover:underline"
                    >
                      Remove
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

        {/* pagination */}
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-center pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal mx-3 text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {showingFrom} - {showingTo}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalItems}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={prevPage}
                disabled={!hasPrevPage}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${
                  !hasPrevPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                Previous
              </button>
            </li>
            {visiblePages.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === pageNumber
                      ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                  !hasNextPage
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 hover:text-gray-700"
                } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableUser;
