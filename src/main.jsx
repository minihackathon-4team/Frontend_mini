import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nav from "./components/nav";
import Homepage from "./pages/homepage";
import Signuppage from "./pages/signuppage";
import Loginpage from "./pages/loginpage";
import Detailedpage from "./pages/detailedpage";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Homepage/>  
  }, 
  {
    path: "/signuppage",
    element:<Signuppage/>
  },
  {
    path: "/loginpage",
    element:<Loginpage/>
  },
  {
    path: "/movie/:movieid",
    element:<Detailedpage/>
  },
  {
    path: "/errorpage",
    element:<ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);