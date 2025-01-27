import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {   useLoaderData, useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
  const axiosPublic = useAxiosPublic();
  // const { id } = useParams();
  const defaultArticledata = useLoaderData(); // Load article data
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loadingPublishers, setLoadingPublishers] = useState(true);

  // Fetch publishers
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

  
  // Initialize form values with defaultArticledata
  useEffect(() => {
    if (defaultArticledata) {
      setValue("title", defaultArticledata.title);
      setValue("publisher", defaultArticledata.publisher);
      setValue("description", defaultArticledata.description);
      setValue("image", defaultArticledata.image);
      setTags(defaultArticledata.tags.map((tag) => ({ value: tag, label: tag })));
    }
  }, [defaultArticledata, setValue]);

  const staticTags = [
    { value: "technology", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "sports", label: "Sports" },
    { value: "politics", label: "Politics" },
  ];

  const onSubmit = async (data) => {
    try {
      // Upload image if it's updated
      let imageUrl = data.image;

      if (data.image[0]) {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          imageUrl = res.data.data.display_url;
        }
      }

      // Updated article data
      const updatedData = {
        title: data.title,
        publisher: data.publisher,
        tags: tags.map((tag) => tag.value),
        description: data.description,
        image: imageUrl,
      };

      // Send PATCH request to update the article
      const response = await axiosPublic.patch(`/article/${defaultArticledata._id}`, updatedData);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Article "${data.title}" has been updated!`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
         navigate("/my-article"); 
      }
    } catch (error) {
      console.error("Failed to update article:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update the article. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-4">Update Article</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            >
              <option value="" disabled>
                Select a Publisher
              </option>
              {publishers.map((publisher) => (
                <option
                  key={publisher._id}
                  value={publisher.name}
                  selected={defaultArticledata.publisher === publisher.name}
                >
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
            {...register("image")}
            type="file"
            className="file-input w-full"
            accept="image/*" 
          />
          {defaultArticledata.image && (
            <img
              src={defaultArticledata.image}
              alt="Current article"
              className="mt-2 h-24 w-24 rounded"
            />
          )}
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
          Update Article
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;