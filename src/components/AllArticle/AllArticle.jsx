import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosPublic.delete("/users");
//       return res.data;
//     },
//   });

  // Fetch all articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosPublic.get("/all-articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Action Handlers
  const handleApprove = (approve,id) =>{
    console.log(id);
    axiosPublic.patch(`/article-status/${id}`,{
        status: approve
    })
    .then( res => console.log(res))
    
  }

//   const handleDecline = async (id) => {
//     try {
//       await axiosPublic.patch(`/articles/${id}/decline`);
//       setArticles((prev) =>
//         prev.map((article) =>
//           article._id === id ? { ...article, status: "Declined" } : article
//         )
//       );
//       Swal.fire("Success", "Article Declined", "success");
//     } catch (error) {
//       console.error("Failed to decline article:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosPublic.delete(`/articles/${id}`);
//       setArticles((prev) => prev.filter((article) => article._id !== id));
//       Swal.fire("Deleted", "Article Deleted Successfully", "success");
//     } catch (error) {
//       console.error("Failed to delete article:", error);
//     }
//   };

const handleMakePremium = (Premiun,id) =>{
    console.log(id);
    axiosPublic.patch(`/ispremium/${id}`,{
        status: Premiun
    })
    .then( res => console.log(res))
}

const handleDelete = async(id) =>{
    // const res = await axiosPublic.delete(`/article-delete/${id}`)
    // console.log(res);

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            axiosPublic.delete(`/article-delete/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                       
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
        }
    });



}

  if (loading) {
    return <p>Loading articles...</p>;
  }


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="card bg-white shadow-md">
            {/* Article Image */}
            <figure>
              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />
            </figure>

            {/* Card Content */}
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>

              {/* Author Section */}
              <div className="flex items-center space-x-4">
                <img
                  src={article.authorPhoto} // Make sure your article object contains the author's photo URL
                  alt={article.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{article.authorName}</p>
                  <p className="text-sm text-gray-500">{article.authorEmail}</p>
                </div>
              </div>

              {/* Publisher and Date */}
              <p className="text-sm text-gray-500 mt-2">
                <strong>Publisher:</strong> {article.publisher}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Posted:</strong>{" "}
                {new Date(article.publisherDate).toLocaleDateString()}
              </p>

              {/* Status */}
              <p className="text-sm text-gray-500">
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
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleApprove('approved',article._id)}
                  className="btn btn-sm btn-success"
                //   disabled
                >
                  Approve
                </button>
                <button
                //   onClick={() => handleDecline(article._id)}
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
                {article.isPremium === 'No'?  <button
                //ispremium
                  
                  onClick={() => handleMakePremium('yes',article._id)}
                  className="btn btn-sm btn-info"
                >
                  Make Premium 
                </button>: <p className="text-green-700">Premium</p> } 
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
