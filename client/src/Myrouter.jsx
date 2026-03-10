import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Generatepage from "./pages/Genearate";
import { useSelector } from "react-redux";
import Editor from "./pages/Editor";

const ProtectedRoute = () => {
  const { userData, isLoading } = useSelector((state) => state.user);

  // While we are checking the current user, avoid redirecting.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If not logged in (and not loading), send user back to home
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
          {
            path: `editor/:id`,
            element: <Editor />,
          },
        ],
      },
    ],
  },
]);

export default router;
