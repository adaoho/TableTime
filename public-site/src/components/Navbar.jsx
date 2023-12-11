import { Link, useNavigate } from "react-router-dom";
import tableTimeLogo from "../assets/tabletime_logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const randomChef = () => {
    let id = Math.ceil(Math.random() * 21);
    navigate(`/cuisine/${id}`);
  };

  return (
    <>
      <div className="w-screen grid grid-cols-3 h-20 border-b-[1px] items-center fixed top-0 bg-white px-14 z-10">
        <div className="pl-15">
          <img src={tableTimeLogo} className="h-10 object-contain" />
        </div>

        <div className="px-4">
          <div className="flex items-center justify-evenly rounded-full shadow-md h-12 w-[420px] border">
            <Link
              to="/"
              className="border-r-2 border-gray-100 px-4 text-sm font-medium hover:scale-105 hover:text-red-500 active:scale-90 transition-all hover:font-bold"
            >
              Best Food
            </Link>
            <button
              onClick={() => randomChef()}
              className="border-r-2 border-gray-100 px-4 text-sm font-medium hover:scale-105 hover:text-red-500 active:scale-90 transition-all hover:font-bold"
            >
              Chef Recomendation
            </button>
            <button className="border-gray-100 px-4 text-sm text-gray-400 hover:scale-105 hover:text-red-500 active:scale-90 transition-all hover:font-bold">
              Our Location
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center pr-15 gap-8">
          <p className="text-sm font-medium">Table Time Your Food</p>
          <span className="material-symbols-outlined">language</span>
          <div className="flex justify-evenly items-center py-1.25 pr-1.25 pl-3 gap-2 rounded-full shadow-md h-10 w-20 border">
            <i className="fa-solid fa-bars"></i>
            <p className="bg-black text-white rounded-full w-7 h-7 text-center pt-1.5 text-[10px] font-semibold">
              E
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
