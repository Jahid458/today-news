import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-6">Oops! The page you're looking for doesn't exist.</p>
                <div className="flex justify-center mb-6">
                    <img
                        src="https://via.placeholder.com/200"
                        alt="404 illustration"
                        className="w-40 h-40 object-cover rounded-full"
                    />
                </div>
                <Link to="/" className="btn btn-primary text-white">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
