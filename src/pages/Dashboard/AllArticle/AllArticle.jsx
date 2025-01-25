import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3; // Number of articles per page

  // Fetch articles using React Query
  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-articles`);
      return res.data;
    },
  });

  const handleApprove = (approve, id) => {
    axiosSecure.patch(`/article-status/${id}`, { status: approve }).then(() => refetch());
  };

  const handleMakePremium = (Premium, id) => {
    axiosSecure.patch(`/ispremium/${id}`, { status: Premium }).then(() => refetch());
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/article-delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  };

  // Pagination logic
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const paginatedArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map((article) => (
          <div key={article._id} className="card bg-white shadow-md p-4">
            {/* Article Image */}
            <figure className="mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover rounded"
              />
            </figure>

            {/* Card Content */}
            <div className="card-body flex flex-col justify-between">
              <h2 className="card-title mb-2">{article.title}</h2>

              {/* Author Section */}
              <div className="flex items-center space-x-4 mb-2">
                <img
                  src={article.authorPhoto}
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{article.authorName}</p>
                  <p className="text-sm text-gray-500">{article.email}</p>
                </div>
              </div>

              {/* Publisher and Date */}
              <p className="text-sm text-gray-500">
                <strong>Publisher:</strong> {article.publisher}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Posted:</strong>{" "}
                {new Date(article.publisherDate).toLocaleDateString()}
              </p>

              {/* Tags */}
              <div className="text-sm text-gray-500 mb-4">
                <strong>Tags:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-blue-100 text-green-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <p className="text-sm text-gray-500 mb-4">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    article.status === "Approved"
                      ? "badge-success"
                      : article.status === "Declined"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {article.status}
                </span>
              </p>

              {/* Action Buttons */}
              <div className="card-actions flex flex-wrap gap-2">
                <button
                  onClick={() => handleApprove("approved", article._id)}
                  className="btn btn-sm btn-success"
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-error"
                  disabled={article.status === "Declined"}
                >
                  Decline
                </button>
                <button
                  onClick={() => handleDelete(article._id)}
                  className="btn btn-sm btn-warning"
                >
                  Delete
                </button>
                {article.isPremium === "No" ? (
                  <button
                    onClick={() => handleMakePremium("yes", article._id)}
                    className="btn btn-sm btn-info"
                  >
                    Make Premium
                  </button>
                ) : (
                  <p className="badge badge-accent badge-outline py-3">Premium</p>
                )}
              </div>
            </div>
          </div>
        ))}
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

export default AllArticles;
