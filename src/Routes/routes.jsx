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
         {
            path:'public-all-article',
            element:<AllArticlePublic></AllArticlePublic>
         },

         {
          path:'my-article',
          element: <MyArticles></MyArticles>
         },
         {
            path:'article-details/:id',
            element: <ArticleDetails></ArticleDetails>,
            loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`),
         },
         {
          path:'update-article/:id',
          element: <UpdateArticle></UpdateArticle>,
          loader: ({ params }) => fetch(`http://localhost:5000/article/${params.id}`),
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
          element: <AllArticles></AllArticles>
       }
      ]
     }
  ]);

