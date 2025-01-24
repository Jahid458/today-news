/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";




const PrivateRoute = ({children}) => {
        const {user, loading} = useAuth();
        const location = useLocation();
        if(loading) return <div className="flex justify-center items-center mt-32">
            <span className="loading loading-bars text-center loading-lg"></span>
        </div>
        if(user) return children
    return  <Navigate  state={{from:location.pathname}} to='/login' replace></Navigate>
};

export default PrivateRoute;