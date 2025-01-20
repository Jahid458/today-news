import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaList,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { GiBoxUnpacking } from "react-icons/gi";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Today News
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-600">
            <FaHome className="inline mr-1" /> Home
          </Link>
          <Link to="/add-article" className="text-gray-700 hover:text-orange-600">
            <FaPlus className="inline mr-1" /> Add Articles
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-orange-600">
            <FaTachometerAlt className="inline mr-1" /> Dashboard
          </Link>
          <Link to="/my-article" className="text-gray-700 hover:text-orange-600">
            <MdPlaylistAddCheckCircle className="inline mr-1" /> My Article
          </Link>
          <Link to="/premium-article" className="text-gray-700 hover:text-orange-600">
            <GiBoxUnpacking className="inline mr-1" /> Premium Article
          </Link>
        </div>

        {/* User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border border-orange-600"
                />
              </Link>
              <button
                onClick={logOut}
                className="text-white bg-orange-600 px-4 py-2 rounded hover:bg-orange-500"
              >
                <FaSignOutAlt className="inline mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-orange-600 border border-orange-600 px-4 py-2 rounded hover:bg-orange-600 hover:text-white"
              >
                <FaSignInAlt className="inline mr-1" /> Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-orange-600 px-4 py-2 rounded hover:bg-orange-500"
              >
                <FaUserPlus className="inline mr-1" /> Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-gray-700"
            >
              <li>
                <Link to="/">
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/add-articles">
                  <FaPlus className="mr-2" /> Add Articles
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaTachometerAlt className="mr-2" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/my-article">
                  <MdPlaylistAddCheckCircle className="mr-2" /> My Article
                </Link>
              </li>
              <li>
                <Link to="/premium-article">
                  <GiBoxUnpacking className="mr-2" /> Premium Article
                </Link>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={logOut}
                    className="text-orange-600 mt-2 border border-orange-600 px-4 py-2 rounded hover:bg-orange-600 hover:text-white w-full"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-orange-600 mt-2 border border-orange-600 px-4 py-2 rounded hover:bg-orange-600 hover:text-white w-full"
                    >
                      <FaSignInAlt className="inline mr-1" /> Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-white bg-orange-600 mt-2 px-4 py-2 rounded hover:bg-orange-500 w-full"
                    >
                      <FaUserPlus className="inline mr-1" /> Register
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
