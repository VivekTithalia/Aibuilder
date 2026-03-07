import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Generatepage from "./pages/Genearate";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userData } = useSelector((state) => state.user);

  // If not logged in, send user back to home
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  // If logged in, render the nested protected routes
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "generate",
            element: <Generatepage />,
          },
        ],
      },
    ],
  },
]);

export default router;
