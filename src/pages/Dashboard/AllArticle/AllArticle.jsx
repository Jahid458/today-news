import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [declineId, setDeclineId] = useState('');

  const articlesPerPage = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Handle Decline with reason modal
  const handleMakeDecline = (status, id) => {
    setDeclineId(id);
    axiosSecure.patch(`/article-status/${id}`, { status }).then(() => {
      document.getElementById("decline_modal").showModal();
    });
  };

  const onSubmit = (data) => {
    axiosSecure.patch(`/declineReasons/${declineId}`, {
      declineReason: data.declineReason,
    }).then(() => {
      Swal.fire("Declined!", "Reason has been submitted.", "success");
      document.getElementById("decline_modal").close();
      reset();
      refetch();
    });
  };

  const { data: articles = [], isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-articles`);
      return res.data;
    },
  });

  const handleApprove = (status, id) => {
    axiosSecure.patch(`/article-status/${id}`, { status }).then(() => refetch());
  };

  const handleMakePremium = (status, id) => {
    axiosSecure.patch(`/ispremium/${id}`, { status }).then(() => refetch());
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
            Swal.fire("Deleted!", "The article has been deleted.", "success");
          }
        });
      }
    });
  };

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

  if (isLoading) return <p className="text-center">Loading articles...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Publisher & Title</th>
              <th className="border px-4 py-2">Posted & Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={article.authorPhoto}
                      alt={article.authorName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p>{article.authorName}</p>
                      <p className="text-sm text-gray-500">{article.email}</p>
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <p className="text-sm text-gray-500">{article.title}</p>
                  <p>{article.publisher}</p>
                </td>
                <td className="border px-4 py-2">
                  <p>{new Date(article.publisherDate).toLocaleDateString()}</p>
                  <span
                    className={`mt-1 inline-block px-2 py-1 rounded-full text-sm ${
                      article.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : article.status === "Declined"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleApprove("approved", article._id)}
                      className="btn btn-success text-white text-sm w-full"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleMakeDecline("declined", article._id)}
                      className="btn btn-warning text-white text-sm w-full"
                      disabled={article.status === "Declined"}
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="btn btn-error text-white text-sm w-full"
                    >
                      Delete
                    </button>
                    {article.isPremium === "No" ? (
                      <button
                        onClick={() => handleMakePremium("yes", article._id)}
                        className="btn btn-primary text-white text-sm w-full"
                      >
                        Make Premium
                      </button>
                    ) : (
                      <span className="p-2 font-bold bg-purple-100 text-purple-600 text-sm rounded text-center w-full">
                        Premium
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn mx-1"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-success text-white" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn mx-1"
        >
          Next
        </button>
      </div>

      {/* Decline Reason Modal */}
      <dialog id="decline_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Decline Reason</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("declineReason", { required: true })}
              rows="4"
              className="w-full p-2 border rounded-lg"
              placeholder="Write your reason here..."
            ></textarea>
            {errors.declineReason && (
              <p className="text-red-500 text-sm mt-1">Reason is required</p>
            )}
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => document.getElementById("decline_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AllArticles;
