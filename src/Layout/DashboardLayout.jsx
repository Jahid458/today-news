import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars, FaUser, FaNewspaper, FaPlus } from "react-icons/fa";
import Navbar from "../pages/Navbar/Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 bg-white shadow-lg min-h-screen w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <div className="flex items-center  justify-between px-6 py-4 bg-blue-500 text-white">
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
                to="/dashboard/users"
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-bold" : ""
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
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-bold" : ""
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
                  `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-bold" : ""
                  }`
                }
              >
                <FaPlus className="mr-3" />
                Add Publisher
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className=" py-6 ">
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
