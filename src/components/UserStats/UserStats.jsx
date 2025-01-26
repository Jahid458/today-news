import React from "react";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const UserStats = () => {
    const axiosSecure = useAxiosPublic();

    const { data: usersStats = [], refetch } = useQuery({
      queryKey: ["users-stats"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users-stats");
        return res.data;
      },
    })

    console.log(usersStats);
 

 
  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">User Statistics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-5xl font-bold text-green-500 mt-4">
            <CountUp start={0} end={usersStats.allUsers} duration={2.5} />
          </p>
        </div>

        {/* Normal Users */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Normal Users</h2>
          <p className="text-5xl font-bold text-blue-500 mt-4">
            <CountUp start={0} end={usersStats.normalUsers} duration={2.5} />
          </p>
        </div>

        {/* Premium Users */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Premium Users</h2>
          <p className="text-5xl font-bold text-yellow-500 mt-4">
            <CountUp start={0} end={usersStats.premiumUsers} duration={2.5} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
