import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const PremiumArticles = () => {
  const axiosSecure = useAxiosSecure();

  // UseQuery with an object argument (v5+ API)
  const { data: articles = [], isLoading, isError, error } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      const response = await axiosSecure.get("/premium-articles");
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-xl">Loading articles...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Premium Articles</h1>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="card shadow-lg">
            <figure>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                {article.description.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Publisher:</span>{" "}
                {article.publisher}
              </p>
              <div className="card-actions justify-end mt-4">
              <Link to={`/article-details/${article._id}`}>
                <button
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
