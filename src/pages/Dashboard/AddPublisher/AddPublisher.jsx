/* eslint-disable no-unused-vars */
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from './../../../hooks/useAxiosPublic'

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
;

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.publisherLogo[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const PublisherInfo = {
        name: data.publisherName,
        logo: res.data.data.display_url,
      };

      const PublisherRes = await axiosPublic.post("/publishers", PublisherInfo);
      console.log(PublisherRes.data);
      if (PublisherRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Addeed New Publishers",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(data);
    console.log(data.publisherName);
    console.log(res.data.data.display_url);
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add Publisher
        </h2>
    

        <div>
          <label
            htmlFor="publisherName"
            className="block text-sm font-semibold text-gray-700"
          >
            Publisher Name:
          </label>
          <input
            type="text"
            id="publisherName"
            name="publisherName"
            {...register("publisherName", { required: true })}
            placeholder="Enter publisher name"
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        <div>
          <label
            htmlFor="publisherLogo"
            className="block text-sm font-semibold text-gray-700"
          >
            Publisher Logo:
          </label>
          <input
            type="file"
            id="publisherLogo"
            name="publisherLogo"
            {...register("publisherLogo", { required: true })}
            accept="image/*"
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-green-300 file:text-green-600 file:bg-blue-50 hover:file:bg-blue-100 border p-2 rounded-lg
            "
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-300 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;