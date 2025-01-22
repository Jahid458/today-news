import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const MyArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();



  // Fetch articles using React Query
  const { data: articles = []} = useQuery({
    queryKey: ["articles", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/articles/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Articles</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Is Premium</th>
              <th className="border border-gray-300 px-4 py-2">Update</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 btn btn-primary text-white rounded">
                    Details
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {article.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {article.isPremium ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                 <Link to={`/update-article/${article._id}`}>
                 <button className="px-3 py-1 bg-pink-500 text-white rounded">
                    Update
                  </button></Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
