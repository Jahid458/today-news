import { useQuery } from "@tanstack/react-query";

import { FaUsers } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const AllUsers = () => {
    const axiosPublic = useAxiosPublic();

  // Fetch users
  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  console.log(users);


  const handleMakeAdmin = (role , id) =>{
    console.log('hello');
    axiosPublic.patch(`/user/admin/${id}`,{
        role: role
    })
    .then( res => console.log(res))
    
  }



  // Loading and Error States
  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to fetch users. Please try again later.</p>;

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
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
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button disabled className="text-green-600 font-bold">Admin</button>
                  ) : (
                    <button
                        onClick={() => handleMakeAdmin('admin', user._id)}
                      className="btn btn-lg bg-orange-500"
                    >
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
