import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import { imageupload, saveUser } from "../../api/utils";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one numeric character.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    // Validate password
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    } else {
      setPasswordErrors([]);
    }

    const photoURL = await imageupload(image);
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await saveUser({ ...result?.user, displayName: name, photoURL });
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full max-w-lg p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600">Sign Up</h1>
          <p className="text-sm text-gray-600">Welcome to Today News</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Select Image
            </label>
            <input type="file" id="image" name="image" accept="image/*" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
              required
            />
            {passwordErrors.length > 0 && (
              <ul className="mt-2 text-sm text-red-500">
                {passwordErrors.map((error, index) => (
                  <li key={index}>- {error}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-sm text-gray-600">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 border rounded-md cursor-pointer hover:bg-gray-100"
        >
          <FcGoogle size={24} />
          <span className="ml-2 text-sm text-gray-600">Continue with Google</span>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;