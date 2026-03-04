import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import useCurrentuser from "./hooks/useCurrentuser";

const App = () => {
  useCurrentuser();
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default App;
