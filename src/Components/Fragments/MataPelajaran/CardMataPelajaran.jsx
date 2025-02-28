import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardMataPelajaran = (props) => {
  const {
    title = "Title Header",
    action,
    idMp,
    tahunajaran,
    idKelas,
    idFase,
  } = props;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col h-full p-5">
        <div className="flex-grow">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Tahun Ajaran {tahunajaran}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            SDN X Pekanbaru
          </p>
        </div>

        <div className="pt-4 mt-auto">
          {action ? (
            <Link
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              to={
                idMp
                  ? `/dashboard/fase/${idFase}/kelas/mp/${idKelas}/kurikulum/${idMp}`
                  : "#"
              }
            >
              {action} <FaArrowRight className="ms-2" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardMataPelajaran;
