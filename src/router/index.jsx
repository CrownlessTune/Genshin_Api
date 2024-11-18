import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/contact";
import Error404 from "../pages/error404";
import Login from "../pages/login";
import Themes from "../pages/themes"; // Asegúrate de importar correctamente el componente Themes

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Ruta para Home
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
    element: <Themes />, // Ruta para Themes
  },
  {
    path: "/*",
    element: <Error404 />, // Ruta para errores
  },
]);
