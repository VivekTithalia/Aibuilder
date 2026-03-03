import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import App from "./App";
const router = createBrowserRouter([
   {
    path: "/",
    element: <App />,  // layout
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
