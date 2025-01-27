import coverImg from '/profile-cover.jpg'
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
    const {user,updateUserProfile} = useAuth();
    const axiosSecure = useAxiosSecure();


  const [name, setName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
   console.log(role);

   const onSubmit = (data) => {
    // Create FormData to send file
    const formData = new FormData();
    formData.append("image", data.image[0]); // Get the first selected file

    axios
      .post(image_hosting_api , formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data.data.display_url; // Get the uploaded image URL
          console.log("Image URL:", imageUrl);
          console.log("Name:", data.name);

          // Update user profile in context
          updateUserProfile(data.name, imageUrl);

          // Update local state to trigger re-render
          setName(data.name);
          setProfileImage(imageUrl);

          axiosSecure
            .patch(`/userInfo/${user.email}`, {
              name: data.name,
              photo: imageUrl,
            })
            .then((response) => {
              console.log(response);
            });

          const modal = document.getElementById("profilemodal");
          modal.close(); // Close the modal
        } else {
          console.error("Image upload failed:", res.data.error.message);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

    return (
        <div className='flex justify-center items-center mt-10 mb-10'>
     
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-black bg-green-600 rounded-full'>
           {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div>
                <button
                onClick={() => document.getElementById('profilemodal').showModal()}
                className='bg-green-500 px-10 py-1 rounded-xl text-black cursor-pointer hover:bg-green-600 block mb-1'>
                  Update Profile
                </button>
            
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('profilemodal').showModal()}>open modal</button> */}
      
 <dialog id="profilemodal" className="modal">
        <div className="modal-box rounded-sm">
          {/* Close button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Form Content */}
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="input input-bordered w-full rounded-sm"
                defaultValue={name} // Set default value
              />
            </div>

            {/* Image Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Profile Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input file-input-bordered rounded-sm w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button
                type="submit"
                className="py-3 bg-green-600 text-white rounded-sm w-full mt-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog> 




    </div>
    );
};

export default Profile;