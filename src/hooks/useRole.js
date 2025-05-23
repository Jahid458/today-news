import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: role} = useQuery({
        queryKey: ['role', user?.email],
        // enabled: !loading &&  !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/users/role/${user?.email}`)
            return data.role
        },
    })
    // console.log(role);
    return [role]

};

export default useRole;