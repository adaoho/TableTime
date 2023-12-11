import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainDashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainDashboard;
