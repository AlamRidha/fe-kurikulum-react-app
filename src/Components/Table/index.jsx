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
            className="px-6 py-2 w-auto text-center"
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
    <table className="table-fixed w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <TableHead header={header} action={action} />
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
