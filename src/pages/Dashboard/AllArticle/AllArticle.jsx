import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [declineid, setDeclineId] = useState('');
  
  const articlesPerPage = 3;
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const handleMakeDecline = (declined,id) =>{
    setDeclineId(id)
    axiosSecure.patch(`/article-status/${id}`,{
      status: declined
    })
  }
  console.log(declineid);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = (data) => {
      axiosSecure.patch(`/declineReasons/${declineid}`,{
        declineReason: data.declineReason
      })
      console.log(data);
  }

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

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
  <tr className="bg-gray-100">
    <th className="border border-gray-300 px-4 py-2">Image</th>
    <th className="border border-gray-300 px-4 py-2">Author</th>
    <th className="border border-gray-300 px-4 py-2">Publisher & Title</th>
    <th className="border border-gray-300 px-4 py-2">Posted & Status</th>
    <th className="border border-gray-300 px-4 py-2">Actions</th>
  </tr>
</thead>
<tbody>
  {paginatedArticles.map((article) => (
    <tr key={article._id} className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">
        <img
          src={article.image}
          alt={article.title}
          className="h-16 w-16 object-cover rounded"
        />
      </td>

      <td className="border border-gray-300 px-4 py-2">
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

      {/* Publisher and Title */}
      <td className="border border-gray-300 px-4 py-2">
        <p className="text-sm text-gray-500 mt-1">{article.title}</p>
        <p>{article.publisher}</p>
      </td>

      {/* Posted & Status */}
      <td className="border border-gray-300 px-4 py-2">
        <p>{new Date(article.publisherDate).toLocaleDateString()}</p>
        <span
          className={`px-2 py-1 mt-1 rounded-full text-sm block ${
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

      <td className="border border-gray-300 px-4 py-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleApprove("approved", article._id)}
            className="p-2 btn btn-success text-white text-sm rounded"
          >
            Approve
          </button>
          <button
            onClick={()=>{
               handleMakeDecline("declined",article._id)
              document.getElementById('my_modal_3').showModal()}
            }
            className="p-2 btn btn-success text-white text-sm rounded"
            disabled={article.status === "Declined"}
          >
            Decline
          </button>
          <button
            onClick={() => handleDelete(article._id)}
            className="p-2 btn btn-error text-white text-sm rounded"
          >
            Delete
          </button>
          {article.isPremium === "No" ? (
            <button
              onClick={() => handleMakePremium("yes", article._id)}
              className="p-2 btn btn-success text-white text-sm rounded"
            >
              Make Premium
            </button>
          ) : (
            <span className="p-3 font-bold bg-purple-100 text-purple-600 text-sm rounded">
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



<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
  <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              id="decline-reason"
              rows="4"
              {...register("declineReason", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-800"
              placeholder="Write your reason here..."
            ></textarea>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end gap-4">
              {/* Cancel Button */}
              <button
                type="button"
                className="btn btn-outline rounded-lg px-4 py-2 text-gray-700 border-gray-300"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700"
              >
                Post
              </button>
            </div>
          </form>

    <textarea></textarea>

  </div>
</dialog>
    </div>
  );
};

export default AllArticles;
