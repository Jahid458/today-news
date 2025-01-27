import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaNewspaper,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { GiBoxUnpacking } from "react-icons/gi";
import logo from '/todayNews.jpeg'
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin()
  const axiosPublic = useAxiosPublic();

  const { data: userType = [] } = useQuery({
    queryKey: ["usertype", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userType/${user?.email}`);
      return res.data;
    },
  });
  // console.log(usertype)

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50 ">
      <div className="container mx-auto px-4 flex justify-between items-center h-24">
      
        {/* Logo Section */}
       <Link to="/" className="flex  justify-center items-center gap-2">
       <div className="lg:text-2xl text-xl font-bold text-white">
          News
        </div>
       <img src={logo} className="lg:w-12 w-10  rounded-full" /> 
       </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className=" text-white hover:text-green-600">
            <FaHome className="inline mr-1" /> Home
          </Link>
          <Link to="/add-article" className= "text-white hover:text-green-600">
            <FaPlus className="inline mr-1" /> Add Articles
          </Link>
          <Link to="/public-all-article" className="text-white hover:text-green-600">
            <FaNewspaper className="inline mr-1" /> All Articles
          </Link>
          {
            isAdmin ? <Link to="/dashboard" className="text-white hover:text-green-600">
            <FaTachometerAlt className="inline mr-1" /> Dashboard
          </Link>: ''
          }
          <Link to="/my-article" className="text-white hover:text-green-600">
            <MdPlaylistAddCheckCircle className="inline mr-1" /> My Article
          </Link>

          {userType.premiumTaken !== null && (
                  <li>
                     <Link to="/premium" className="text-white hover:text-green-600">
            <GiBoxUnpacking className="inline mr-1" /> Premium Article
          </Link>
                  </li>
                )}
         
         
        </div>

        {/* User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border bg-green-600"
                />
              </Link>
              <button
                onClick={logOut}
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-600"
              >
                <FaSignOutAlt className="inline mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white"
              >
                <FaSignInAlt className="inline mr-1" /> Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-600"
              >
                <FaUserPlus className="inline mr-1" /> Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden bg-white">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-green-600 rounded-box w-52 text-white"
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
                <Link to="/all-articles">
                  <FaNewspaper className="mr-2" /> All Articles
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
                    className="text-white mt-2 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white w-full"
                  >
                    <FaSignOutAlt className="inline mr-1" /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-white mt-2 border border-white px-4 py-2 rounded hover:bg-green-600 hover:text-white w-full"
                    >
                      <FaSignInAlt className="inline mr-1" /> Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-white border-white mt-2 px-4 py-2 rounded hover:bg-green-600 w-full"
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
