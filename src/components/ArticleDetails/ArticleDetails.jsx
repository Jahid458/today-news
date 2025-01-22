import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ArticleDetails = () => {
  const { id } = useParams(); // Get article ID from the URL
  const axiosPublic = useAxiosPublic();

  // Fetch article details using React Query
  const { data: article, isLoading, isError } = useQuery({
    queryKey: ["articleDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/article/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-lg text-red-500">Failed to load article details</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="card bg-white shadow-xl max-w-3xl w-full rounded-lg">
        <figure>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-bold">{article.title}</h2>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Publisher:</span> {article.publisher}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Published On:</span>{" "}
            {new Date(article.publisherDate).toLocaleDateString()}
          </p>
          <p className="mt-4 text-gray-700">{article.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <img
              src={article.authorPhoto}
              alt={article.authorName}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <p className="font-semibold">{article.authorName}</p>
              <p className="text-gray-500 text-sm">{article.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <Link to='/public-all-article'><button className="btn btn-primary">Back to Articles</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
