const Semester = (props) => {
  const { data, getIdSemester } = props;

  return (
    <div className="relative flex justify-end p-2">
      <div className="flex flex-col w-1/6">
        <select
          id="semester"
          className="block w-full p-3 text-sm text-gray-900 border border-blue-500 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => getIdSemester(e.target.value)}
        >
          <option defaultValue>Pilih Semester</option>
          {data.length > 0 ? (
            data.map((item) => (
              <option key={item.idSemester} value={item.idSemester}>
                {item.namaSemester}
              </option>
            ))
          ) : (
            <option disabled>Data tidak ada</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default Semester;
