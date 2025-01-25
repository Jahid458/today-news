import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Fetch users
  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Pagination logic
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
    axiosSecure
      .patch(`/user/admin/${id}`, {
        role: role,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Admin Now",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // Loading and Error States
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users. Please try again later.</p>;

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {totalUsers}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{(currentPage - 1) * usersPerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button disabled className="text-green-600 font-bold">
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin("admin", user._id)}
                      className="btn bg-green-600"
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 border ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-green-600 border-green-600"
          } rounded-md`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === index + 1
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600"
            } rounded-md`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 border ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-green-600 border-green-600"
          } rounded-md`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
