import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path:'/',
          element:<Home/>
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
     }
  ]);

