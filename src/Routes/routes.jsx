import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddArticle from "../components/AddArticle/AddArticle";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";

import MyArticles from "../components/MyArticles/MyArticles";
import UpdateArticle from "../components/UpdateArticle/UpdateArticle";
import AllArticles from "../pages/Dashboard/AllArticle/AllArticle";
import AllArticlePublic from "../components/AllArticlePublic/AllArticlePublic";
import ArticleDetails from "../components/ArticleDetails/ArticleDetails";
import Profile from "../pages/Dashboard/Profile/Profile";
import PrivateRoute from './PrivateRoute';
import Subscription from "../components/Subscription/Subscription";
import AdminRoute from "./AdminRoute";


{/* <PrivateRoute></PrivateRoute>  */}
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
          element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute> 
         },
         {
            path:'public-all-article',
            element:<AllArticlePublic></AllArticlePublic>
         },

         {
          path:'my-article',
          element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>  
         },
         {
            path:'article-details/:id',
            element:  <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`),
         },
         {
          path:'update-article/:id',
          element: <UpdateArticle></UpdateArticle>,
          loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`),
          },
          {
            path:'subscription',
            element:<PrivateRoute><Subscription></Subscription></PrivateRoute>
          },
           
          {
        path:'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute> 
          }         
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
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        {
          path: 'users',
          element: <AdminRoute><AllUser></AllUser></AdminRoute>
        },
        {
          path: 'all-articles',
          element: <AdminRoute><AllArticles></AllArticles></AdminRoute>
       },
        {
          path:'publisher',
          element: <AdminRoute><AddPublisher></AddPublisher></AdminRoute>
        },
       
      
      ]
     }
  ]);

