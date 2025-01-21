import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
  const {user} = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loadingPublishers, setLoadingPublishers] = useState(true);

  // Fetch publishers from the API
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosPublic.get("/publishers"); 
        setPublishers(response.data);
        setLoadingPublishers(false);
      } catch (error) {
        console.error("Failed to fetch publishers:", error);
        setLoadingPublishers(false);
      }
    };

    fetchPublishers();
  }, []);
  console.log(publishers);

  const staticTags = [
    { value: "technology", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "sports", label: "Sports" },
    { value: "Politics", label: "Politics" },
  ];

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Upload image and get URL
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.success) {
      const articleData = {
        title: data.title,
        publisher: data.publisher,
        tags: tags.map((tag) => tag.value),
        description: data.description,
        image: res.data.data.display_url,
        status:'pending',
        viewCount: 0,
        isPremium: 'No',
        authorName: user?.displayName,
        authorPhoto: user?.photoURL,
        publisherDate: new Date()
      };

      // Submit article data to the backend
      const response = await axiosPublic.post("/add-article", articleData); 
      if (response.data.insertedId) {
        reset();
        setTags([]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Article "${data.title}" has been submitted! Pending admin approval.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Article</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
        {/* Title */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            placeholder="Enter article title"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Publisher */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Publisher*</span>
          </label>
          {loadingPublishers ? (
            <p>Loading publishers...</p>
          ) : (
            <select
              {...register("publisher", { required: true })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Select a Publisher
              </option>
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Tags */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Tags*</span>
          </label>
          <Select
            options={staticTags}
            isMulti
            value={tags}
            onChange={(selected) => setTags(selected)}
            className="w-full"
          />
        </div>

        {/* Image Upload */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Image*</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
            accept="image/*"
          />
        </div>

        {/* Description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description*</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Write a brief description of the article"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit Article
        </button>
      </form>
    </div>
  );
};
  
export default AddArticle; 
