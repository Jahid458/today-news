import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaUser, FaUserShield, FaUsers } from "react-icons/fa";

const UserStats = () => {
  const axiosSecure = useAxiosPublic();

  const { data: usersStats = {} } = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-stats");
      return res.data;
    },
  });

  const stats = [
    {
      title: "Total Users",
      count: usersStats.allUsers,
      icon: <FaUsers className="text-4xl text-green-600" />,
    },
    {
      title: "Normal Users",
      count: usersStats.normalUsers,
      icon: <FaUser className="text-4xl text-green-600" />,
    },
    {
      title: "Premium Users",
      count: usersStats.premiumUsers,
      icon: <FaUserShield className="text-4xl text-green-600" />,
    },
  ];

  return (
    <div className="py-10 px-4 dark:bg-gray-900 min-h-[60vh] flex flex-col items-center">
      <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">
        User Statistics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {stats.map(({ title, count, icon }, i) => (
          <div
            key={i}
            className="shadow-lg rounded-xl p-6 text-center transition hover:scale-105 duration-300 bg-white dark:bg-gray-800"
          >
            <div className="flex flex-col items-center">
              {icon}
              <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mt-2">{title}</h2>
              <p className="text-5xl font-bold text-green-500 mt-2">
                <CountUp start={0} end={count || 0} duration={2.5} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
