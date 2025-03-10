import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const MyArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [declineText,setDeclineTest]= useState('');



  // Fetch articles using React Query
  const { data: articles = [], refetch} = useQuery({
    queryKey: ["articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${user?.email}`);
      return res.data;
    },
  });


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
    console.log(articles);
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">My Articles</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
             <th className="border border-gray-300 px-4 py-2">Details</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Decline Reason</th>
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
                  <Link to={`/article-details/${article._id}`}>
                  <button className="px-3 py-1 btn btn-primary text-white rounded">
                    Details
                  </button>
                  </Link>
                 
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {article.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                      disabled = {!article.declineReason}
                    onClick={() => {
                    
                      setDeclineTest(article.declineReason)
                      document.getElementById('my_modal_3').showModal()}}
                  className="bg-green-200 p-1 rounded-lg disabled:cursor-not-allowed">Decline Reason</button>
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
              
                  <button
                   onClick={() => handleDelete(article._id)}
                     className="px-3 py-1 bg-red-500 text-white rounded">
                    
                    Delete
                  </button>
             
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-none bg-rose-500 text-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* <h3 className="font-bold text-lg">{declineText}</h3> */}
          <p className="py-4">{declineText}</p>
        </div>
       </dialog>
    </div>


  );
};

export default MyArticles;
