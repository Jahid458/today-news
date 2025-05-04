import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const AllArticlePublic = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Get user type
  const { data: usertype = [] } = useQuery({
    queryKey: ["usertype", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userType/${user?.email}`);
      return res.data;
    },
  });

  // Fetch articles
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["allArticles", searchTerm, selectedPublisher, selectedTag],
    queryFn: async () => {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedPublisher) params.publisher = selectedPublisher;
      if (selectedTag) params.tags = selectedTag;

      const res = await axiosPublic.get("/all-article-user", { params });
      return res.data;
    },
  });

  // Fetch publishers
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleViewCount = (id) => {
    axiosPublic.patch(`/viewCount/${id}`).then(() => {
      refetch();
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">All Articles</h2>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
        />
        <select
          className="select select-bordered w-full md:w-1/4 dark:bg-gray-800 dark:text-white"
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
        >
          <option value="">All Publishers</option>
          {publishers.map((publisher) => (
            <option key={publisher._id} value={publisher.name}>
              {publisher.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-full md:w-1/4 dark:bg-gray-800 dark:text-white"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="technology">Technology</option>
          <option value="Politics">Politics</option>
          <option value="sports">Sports</option>
        </select>
        <button
          onClick={handleSearch}
          className="btn btn-primary w-32 text-white"
        >
          Search
        </button>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className={`card border p-4 rounded-lg flex flex-col justify-between h-full ${
              article.isPremium === "Yes"
                ? "bg-yellow-100 border-yellow-400"
                : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700"
            }`}
          >
            <div>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold dark:text-white">
                {article.title}
              </h3>
              <p className="text-gray-600 badge badge-outline mt-2 dark:text-gray-300">
                {article.publisher}
              </p>
              <p className="text-gray-700 mt-1 mb-4 dark:text-gray-400">
                {article.description?.slice(0, 90)}...
              </p>
            </div>

            <div>
              {article.isPremium === "Yes" && usertype?.premiumTaken === null ? (
                <button
                  disabled
                  className="btn btn-primary w-full mt-2 text-white"
                >
                  Details
                </button>
              ) : (
                <Link to={`/article-details/${article._id}`}>
                  <button
                    onClick={() => handleViewCount(article._id)}
                    className="btn btn-primary w-full mt-2 text-white"
                  >
                    Details
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticlePublic;
