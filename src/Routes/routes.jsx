import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddArticle from "../components/AddArticle/AddArticle";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AllArticle from "../components/AllArticle/AllArticle";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path:'/',
          element:<Home/>
         },
         {
          path:'add-article',
          element: <AddArticle></AddArticle>
         },
        
         
      ]
    },
    {
      path:'login',
      element: <Login></Login>
     },
     {
      path:'register',
      element: <Register></Register>
     },
     {
      path: 'dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children:[
        {
          path: 'users',
          element: <AllUser></AllUser>
        },
        {
          path:'publisher',
          element: <AddPublisher></AddPublisher>
        },
        {
          path: 'all-articles',
          element: <AllArticle></AllArticle>
       }
      ]
     }
  ]);

