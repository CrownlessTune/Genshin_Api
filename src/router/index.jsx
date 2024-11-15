import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/contact"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,  // Página de inicio
  },
  {
    path: "/contact",
    element: <Contact />,  // Página de contacto
  },
]);
