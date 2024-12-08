import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";  // Usando el alias '@' para resolver la ruta desde 'src'
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";
import Login from "../pages/Login";
import Characters from "../pages/Characters";
import Community from "../pages/Community";
import Regions from "../pages/Regions";
import Enemies from "../pages/Enemies";
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
