import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer/Footer";
import Navbar from "../pages/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-220px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;