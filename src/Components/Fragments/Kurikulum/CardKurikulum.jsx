import { FaArrowRight } from "react-icons/fa";
import BookImage from "../../../assets/bookkrk.jpg";
import { Link } from "react-router-dom";

const CardKurikulum = (props) => {
  const { title = "Title Header", action, idFase, idKelas, idMp, menu } = props;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={
          idFase
            ? `/dashboard/fase/${idFase}/kelas/mp/${idKelas}/kurikulum/${idMp}/${menu}`
            : "#"
        }
      >
        <img
          className="items-center h-auto max-w-full rounded-t-lg"
          src={BookImage}
          alt="Default Image School"
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        {action ? (
          <Link
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to={
              idFase
                ? `/dashboard/fase/${idFase}/kelas/mp/${idKelas}/kurikulum/${idMp}/${menu}`
                : "#"
            }
          >
            {action} <FaArrowRight className="ms-2" />
          </Link>
        ) : (
          <button
            type="button"
            className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled
          >
            Tidak ada aksi
          </button>
        )}
      </div>
    </div>
  );
};

export default CardKurikulum;
