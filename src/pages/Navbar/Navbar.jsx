import { Link } from "react-router-dom";
import { FaSignOutAlt, FaSignInAlt, FaUserPlus, FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import logo from "/todayNews.jpeg";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useTheme } from "../../ThemeProvider/ThemeProvider";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const { theme, toggleTheme } = useTheme();

  const { data: userType = [] } = useQuery({
    queryKey: ["usertype", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userType/${user?.email}`);
      return res.data;
    },
  });

  return (
    <nav className="bg-white dark:bg-gray-900 border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-24">
        {/* Logo Section */}
        <Link to="/" className="flex justify-center items-center gap-2">
          <div className="lg:text-2xl text-xl font-bold text-black dark:text-white">News</div>
          <img src={logo} className="lg:w-12 w-10 rounded-full" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-black dark:text-white hover:text-green-600">Home</Link>
          <Link to="/public-all-article" className="text-black dark:text-white hover:text-green-600">All Articles</Link>
          <Link to="/about" className="text-black dark:text-white hover:text-green-600">About</Link>

          {user && (
            <>
              <Link to="/add-article" className="text-black dark:text-white hover:text-green-600">Add Articles</Link>
              {isAdmin && <Link to="/dashboard/statistics" className="text-black dark:text-white hover:text-green-600">Dashboard</Link>}
              <Link to="/my-article" className="text-black dark:text-white hover:text-green-600">My Article</Link>

              {userType.premiumTaken !== null && (
                <Link to="/premium" className="text-black dark:text-white hover:text-green-600">Premium Article</Link>
              )}
            </>
          )}
        </div>

        {/* Theme Toggle + User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            {theme === "light" ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-400" />}
          </button>

          {user ? (
            <>
              <Link to="/profile">
                <img src={user?.photoURL || "https://via.placeholder.com/40"} alt="User Profile" className="w-10 h-10 rounded-full border bg-green-600" />
              </Link>
              <button onClick={logOut} className="text-black dark:text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                <FaSignOutAlt className="inline mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white">Login</Link>
              <Link to="/register" className="text-black dark:text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden bg-white dark:bg-gray-900">
        
          <div className="dropdown dropdown-end">
              {/* Theme Toggle Button in Mobile */}
              <button onClick={toggleTheme} className="p-2 rounded-full  bg-gray-200 dark:bg-gray-800">
                  {theme === "light" ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-400" />}
              </button>
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-green-600 dark:bg-gray-800 rounded-box w-52 text-black dark:text-white">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-articles">All Articles</Link></li>

              {user && (
                <>
                  <li><Link to="/add-articles">Add Articles</Link></li>
                  {isAdmin && <li><Link to="/dashboard/statistics">Dashboard</Link></li>}
                  <li><Link to="/my-article">My Article</Link></li>
                  {userType.premiumTaken !== null && <li><Link to="/premium-article">Premium Article</Link></li>}
                </>
              )}

              <li>
                

                {user ? (
                  <button onClick={logOut} className="text-black dark:text-white mt-2 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white w-full">
                    <FaSignOutAlt className="inline mr-1" /> Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="text-black dark:text-white border border-white px-4 py-2 rounded hover:bg-green-600 hover:text-white w-full">
                      <FaSignInAlt className="inline mr-1" /> Login
                    </Link>
                    <Link to="/register" className="text-black dark:text-white border-white px-4 py-2 rounded hover:bg-green-600 w-full">
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
