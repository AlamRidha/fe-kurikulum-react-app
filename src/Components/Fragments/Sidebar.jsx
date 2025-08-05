import { FiUsers } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { IoBookOutline, IoDocumentAttachOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import ListMenu from "../Elements/Menu";

const Sidebar = (props) => {
  const { handleLogout } = props;
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-6 text-lg font-medium ">
            <ListMenu
              toPage="/dashboard"
              menuTitle="Dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <GoHome className="w-6 h-6" />
            </ListMenu>

            <ListMenu
              toPage="/dokumenkurikulum"
              menuTitle="Kurikulum"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoDocumentAttachOutline className="w-6 h-6" />
            </ListMenu>
            <ListMenu
              toPage="/bukuguru"
              menuTitle="Buku Guru"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoBookOutline className="w-6 h-6" />
            </ListMenu>

            <ListMenu
              toPage="/profilpelajar"
              menuTitle="Profil Pelajar"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <PiStudent className="w-6 h-6" />
            </ListMenu>
            <ListMenu
              toPage="/report"
              menuTitle="Report"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <HiOutlineDocumentReport className="w-6 h-6" />
            </ListMenu>
            <ListMenu
              toPage="/users"
              menuTitle="Users"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FiUsers className="w-6 h-6" />
            </ListMenu>

            <ListMenu
              menuTitle="Keluar"
              onClick={handleLogout}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoMdExit className="w-6 h-6" />
            </ListMenu>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
