import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import useCurrentuser from "./hooks/useCurrentuser";
import { Toaster } from "react-hot-toast";

const App = () => {
  useCurrentuser();
  return (
    <>
      <Navbar />

      <Outlet />
      <Toaster />
    </>
  );
};

export default App;
