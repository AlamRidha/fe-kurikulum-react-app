import { FaArrowRight } from "react-icons/fa";
import SchoolImage from "../../../assets/school.jpg";
import { Link } from "react-router-dom";

const CardFase = (props) => {
  const { title = "Title Header", action, id } = props;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={id ? `/dashboard/fase/${id}` : "#"}>
        <img
          className="items-center h-auto max-w-full rounded-t-lg"
          src={SchoolImage}
          alt="Default Image School"
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          SDN X Pekanbaru
        </p>
        {action ? (
          <Link
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to={id ? `/dashboard/fase/${id}` : "#"}
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

export default CardFase;
