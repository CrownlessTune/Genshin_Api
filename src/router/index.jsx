import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/contact";
import Error404 from "../pages/error404";
import Login from "../pages/login";
import Characters from "../pages/characters";
import Community from "../pages/community";
import Regions from "../pages/regions";
import Enemies from "../pages/enemies";
import User from "../pages/user";
import { auth } from "../config/firebase";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/user",
    element: <User />,
    requiresAuth: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/characters",
    element: <Characters />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/enemies",
    element: <Enemies />,
  },
  {
    path: "/regions",
    element: <Regions />,
  },
  {
    path: "/*",
    element: <Error404 />,
  },
]);
