import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard page</h1>
      <div className="btn">
        <Link to="/generate">
          <button className="p-3 h-9 rounded-lg bg-blue-500 text-white flex items-center">
            New Website
          </button>
        </Link>
      </div>
    </>
  );
};
export default Dashboard;
