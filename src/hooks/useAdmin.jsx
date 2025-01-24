import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isAdmin, isPending: isAdmingLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async() =>{
            const res = await  axiosSecure.get(`/users/admin/${user?.email}`);
            // console.log(res.data);
            return res.data?.admin
        }
    });
    return [isAdmin, isAdmingLoading]
};

export default useAdmin;