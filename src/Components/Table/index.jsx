const TableHead = (props) => {
  const { header, action } = props;
  return (
    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="py-1 text-center w-14">
          No
        </th>
        {header.map((column, index) => (
          <th
            key={column.key || index}
            scope="col"
            className="w-auto px-6 py-2 text-center"
          >
            {column.label}
          </th>
        ))}

        {action && (
          <th scope="col" className="px-2 py-3 text-center">
            <span className={action ? "text-sm" : "sr-only"}>Aksi</span>
            {/* <span>Aksi</span> */}
          </th>
        )}
      </tr>
    </thead>
  );
};

const Table = (props) => {
  const { header = [], action = false, children } = props;
  return (
    <table className="w-full h-full text-sm text-left text-gray-500 table-fixed rtl:text-right dark:text-gray-400">
      <TableHead header={header} action={action} />
      <tbody>{children}</tbody>
    </table>
  );
};

const PaginationTable = (props) => {
  const {
    showingFrom,
    showingTo,
    totalItems,
    onPrevPage = () => {},
    hasPrevPage,
    visiblePages,
    onNextPage = () => {},
    hasNextPage,
    currentPage,
    onPaginate = () => {},
  } = props;

  return (
    <nav
      className="flex flex-wrap items-center justify-center pt-4 flex-column md:flex-row"
      aria-label="Table navigation"
    >
      <span className="block w-full mx-3 mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {showingFrom} - {showingTo}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalItems}
        </span>
      </span>
      <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
        <li>
          <button
            onClick={onPrevPage}
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
              onClick={() => onPaginate(pageNumber)}
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
            onClick={onNextPage}
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
  );
};

Table.PaginationTable = PaginationTable;

export default Table;
