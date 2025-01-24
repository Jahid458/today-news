import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


// eslint-disable-next-line react/prop-types
const AdminRoute = ({children}) => {
    const {user, isLoading} = useContext(AuthContext)
    const [isAdmin, isAdmingLoading] = useAdmin();
    
    const location = useLocation();
    if(isLoading || isAdmingLoading) return <div className="flex justify-center items-center mt-32">
        <span className="loading loading-bars text-center loading-lg"></span>
    </div>
    if(user && isAdmin) return children
return  <Navigate  state={{from:location.pathname}} to='/login' replace></Navigate>
};

export default AdminRoute;