import coverImg from '/profile-cover.jpg';
import { FaUser, FaEnvelope, FaIdBadge } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const [role] = useRole();
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    axios.post(image_hosting_api, formData)
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data.data.display_url;
          updateUserProfile(data.name, imageUrl)
            .then(() => {
              setName(data.name);
              setProfileImage(imageUrl);
              setLastUpdated(new Date());

              axiosSecure.patch(`/userInfo/${user.email}`, {
                name: data.name,
                photo: imageUrl,
              });

              document.getElementById("profilemodal").close();
              toast.success("Profile updated successfully!");
            })
            .catch(() => {
              toast.error("Failed to update user profile.");
            });
        }
      })
      .catch(() => {
        toast.error("Image upload failed.");
      });
  };

  return (
    <div className="flex justify-center items-center px-4 py-10 relative">
      <Toaster position="top-right" />

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden">
        <img
          src={coverImg}
          alt="Cover"
          className="w-full h-48 object-cover"
        />
        <div className="relative -top-12 flex flex-col items-center px-4">
          <img
            src={profileImage || user?.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-md"
          />
          <span className="mt-2 px-3 py-1 rounded-full bg-green-600 text-white text-sm uppercase">
            {role}
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 dark:text-white">
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <FaUser className="text-green-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{name}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <FaEnvelope className="text-blue-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <FaIdBadge className="text-purple-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-semibold">{user?.uid}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center gap-4"
            whileHover={{ scale: 1.03 }}
          >
            <MdEdit className="text-yellow-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-semibold">
                {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="text-center pb-6">
          <button
            onClick={() => document.getElementById('profilemodal').showModal()}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <MdEdit />
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="profilemodal" className="modal">
        <div className="modal-box bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded">
          <form method="dialog" className="absolute right-2 top-2">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
          <h3 className="text-xl font-bold mb-4">Update Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                defaultValue={name}
                {...register("name", { required: true })}
                className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input file-input-bordered w-full dark:bg-gray-800 dark:border-gray-700"
              />
              {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
            </div>
            <button type="submit" className="btn bg-green-600 text-white w-full hover:bg-green-700">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
