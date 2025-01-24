import { useQuery } from "@tanstack/react-query";

import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

  // Fetch users
  const { data: users = [], refetch, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);


  const handleMakeAdmin = (role , id) =>{
    axiosSecure.patch(`/user/admin/${id}`,{
        role: role
    })
    .then( res =>{ 
      console.log(res)
      if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: 'Succesfully Admin Now',
            showConfirmButton: false,
            timer: 1500
          });   
    }
    })
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
    </div>
  );
};

export default AllUsers;
