import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { saveUser } from "../../api/utils";
import { useState } from "react";

const Login = () => {
  const { signInWithGoogle, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState("");

  const userLogin = () =>{
      setEmail('araf@email.com');
      setPassword('123456')
  }
  const AdminLogin = () =>{
      setEmail('admin@admin.com');
      setPassword('Admin!!1234')
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // User Login
      await signIn(email, password);
      navigate(`${location?.state?.from ? location?.state?.from : "/"}`);
      toast.success("Login Successful");
      setAuthError(""); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate(`${location?.state?.from ? location?.state?.from : "/"}`);
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-full max-w-lg p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="space-x-4 mb-4">
            <button onClick={AdminLogin} className="btn px-10 font-bold bg-green-600 hover:bg-green-700 hover:text-white">Admin</button>
            <button onClick={userLogin} className="btn px-10 font-bold bg-green-600 hover:bg-green-700 hover:text-white">User</button>
          </div>
          <h1 className="text-3xl font-bold text-green-600">Log In</h1>
          <p className="text-sm text-gray-600">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
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
              value={password}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-600"
            />
          </div>
          {authError && (
            <p className="text-sm text-red-500 mt-1">{authError}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-right">
          <button className="text-sm text-gray-600 hover:text-green-600 hover:underline">
            Forgot password?
          </button>
        </div>
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
          Don’t have an account yet?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
