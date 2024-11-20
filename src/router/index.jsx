import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/contact";
import Error404 from "../pages/error404";
import Login from "../pages/login";
import Themes from "../pages/themes"; 
import Characters from "../pages/characters";
import Community from "../pages/community";
import Regions from "../pages/regions";
import Enemies from "../pages/enemies";


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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/themes",
    element: <Themes />, 
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
