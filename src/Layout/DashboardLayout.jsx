import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaUser, FaNewspaper, FaPlus, FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import DashBoardNavbar from "../components/DashboardNavbar/DashBoardNavbar";
import useAuth from "../hooks/useAuth";



const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {  logOut } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 bg-white dark:bg-gray-800 shadow-lg h-screen w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50 overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-green-600 text-white">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            className="lg:hidden text-white"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
          <li>
              <NavLink
                to="/dashboard/statistics"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <MdDashboard className="mr-3" />
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <FaUser className="mr-3" />
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-articles"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <FaNewspaper className="mr-3" />
                All Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/publisher"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <FaPlus className="mr-3" />
                Add Publisher
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <FaPlus className="mr-3" />
                Profile
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-200 ${
                    isActive ? "bg-green-600 font-bold" : ""
                  }`
                }
              >
                <FaHome className="mr-3" />
                Home
              </NavLink>
            </li>
            <li>
              <button className="px-6 hover:text-green-600" onClick={logOut}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        {/* <Navbar /> */}
          <DashBoardNavbar/>
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
