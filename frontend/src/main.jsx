import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import App from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Booking from "./pages/Booking.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/services/:serviceName",
    element: <ServiceDetails/>,
  },
  {
    path: "/booking",
    element: <Booking/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
);
