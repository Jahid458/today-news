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

  // Fetch articles using React Query
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

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleViewCount = (id) =>{
    
    console.log(id);
    axiosPublic.patch(`/viewCount/${id}`)
    .then(res => {
        refetch()
        console.log(res)
    })

  }

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
          className="input input-bordered w-full md:w-1/3"
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
        >
          <option value="">All Publishers</option>
          <option value="BBC">BBC</option>
          <option value="Al Jazeera">Al Jazeera</option>
        </select>
        <select
          className="select select-bordered w-full md:w-1/4"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="technology">Technology</option>
          <option value="Politics">Politics</option>
          <option value="sports">Sports</option>
          {/*    */}
        </select>
        <button
          onClick={handleSearch}
          className="btn btn-primary px-5 text-white"
        >
          Search
        </button>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {articles.map((article) => (
          <div
            key={article._id}
            className={`card border p-4 rounded-lg ${
              article.isPremium === null ? "bg-yellow-100 border-yellow-400" : "bg-white border-gray-300"
            }`}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{article.title}</h3>
            <p className="text-gray-600 badge  badge-outline mt-2">{article.publisher}</p>
            <p className="text-gray-700 mb-4 mt-1">{article.description}</p>
            <Link to={`/article-details/${article._id}`}>
              <button
                onClick={() => handleViewCount(article._id) }
                className={`btn btn-primary text-white px-4 py-2 ${
                  article.isPremium === "Yes" && !user?.subscription
                    ? "btn-disabled opacity-50"
                    : ""
                }`}
                
                //&& !user?.subscription
                disabled={article.isPremium === "Yes" }
              >
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticlePublic;
