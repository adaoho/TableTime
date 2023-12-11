import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
