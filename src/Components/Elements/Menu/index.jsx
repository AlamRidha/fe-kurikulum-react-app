import { Link } from "react-router-dom";

const ListMenu = (props) => {
  const { toPage = "/", menuTitle, children, onClick } = props;
  return (
    <li>
      {onClick ? (
        <button
          onClick={onClick}
          className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          {children}
          <span className="ml-3">{menuTitle}</span>
        </button>
      ) : (
        <Link
          to={toPage}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          {children}
          <span className="ms-3">{menuTitle}</span>
        </Link>
      )}
    </li>
  );
};

export default ListMenu;
