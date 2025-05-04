import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Fetch users
  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Pagination
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleMakeAdmin = (role, id) => {
    axiosSecure.patch(`/user/admin/${id}`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Made Admin",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // Loading and Error States
  if (isLoading) return <p className="text-center mt-6 text-lg">Loading users...</p>;
  if (isError) return <p className="text-center mt-6 text-red-600">Failed to fetch users.</p>;

  return (
    <div>
      <div className="flex justify-between items-center my-6 px-4">
        <h2 className="text-3xl font-bold">All Users</h2>
        <h2 className="text-xl text-gray-600">Total Users: {totalUsers}</h2>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-green-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user._id}
                className={user.role === "admin" ? "bg-green-50" : ""}
              >
                <th>{(currentPage - 1) * usersPerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  {user.role === "admin" ? (
                    <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-sm">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin("admin", user._id)}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-green-600 border-green-600 hover:bg-green-100"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600 hover:bg-green-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-green-600 border-green-600 hover:bg-green-100"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
