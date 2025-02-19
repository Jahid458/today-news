import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashBoardNavbar = () => {
  const [search, setSearch] = useState("");
  const {user} = useAuth();
  const [role] = useRole();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex bg-white dark:bg-slate-900 dark:text-white sticky top-0 z-50 h-[61px] justify-between items-center  px-10">
      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-black"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center ">
                <h1 className="text-sm uppercase text-green-600">{user?.displayName}</h1>
                <p className=' text-black dark:text-white'>{role}</p>
            </div>
         <img src={user.photoURL} alt="" className="h-[45px] w-[45px] rounded-full border border-green-500" />
      </div>
    </div>
  );
};

export default DashBoardNavbar;
