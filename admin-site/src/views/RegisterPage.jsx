import tableTimeLogo from "../assets/tabletime_logo.png";
import { motion as m } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import tableTimeApi from "../config";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleChangeRegister = (element) => {
    element.preventDefault();
    const { name, value } = element.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const getRegister = async (element) => {
    element.preventDefault();
    try {
      const { data } = await tableTimeApi.post("/user/add-user", registerForm, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log(data, "<<<< from axios getRegister useEffect");

      navigate("/login");
      Swal.fire({
        title: `Thank you for Register`,
        text: `Please login again with ${data.newUser.email}`,
        timer: 2500,
        showConfirmButton: false,
        color: "#ffffff",
        background: "#EF4444",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // console.log(error, "<<< from getLogin");
    }
  };

  return (
    <>
      <m.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen bg-white"
      >
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-100 shadow-2xl bg-white">
          <div className="flex flex-col justify-center items-center mb-4 w-full">
            <img src={tableTimeLogo} className="h-20 object-contain" />
            <p className="text-xs font-normal text-gray-400 text-center my-4">
              Gain access to personalize dashboard Table Time Website. Please
              inform your team to register on this website.
            </p>
          </div>
          <ToastContainer />
          <form action="" className="space-y-6" onSubmit={getRegister}>
            <div className="flex flex-row gap-x-3">
              <div className="space-y-1 text-sm">
                <label for="username" className="block text-gray-500">
                  Username
                </label>
                <input
                  onChange={handleChangeRegister}
                  value={registerForm.username}
                  type="text"
                  name="username"
                  placeholder="type your username"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label for="username" className="block text-gray-500">
                  Email
                </label>
                <input
                  onChange={handleChangeRegister}
                  value={registerForm.email}
                  type="text"
                  name="email"
                  placeholder="type your email"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label for="password" className="block text-gray-400">
                Password
              </label>
              <input
                onChange={handleChangeRegister}
                value={registerForm.password}
                type="password"
                name="password"
                placeholder="Minimum 5 characters"
                className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
              />
            </div>
            <div className="flex flex-row gap-x-3">
              <div className="space-y-1 text-sm">
                <label for="username" className="block text-gray-500">
                  Phone Number
                </label>
                <input
                  onChange={handleChangeRegister}
                  value={registerForm.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  placeholder="Your +62 number"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label for="username" className="block text-gray-500">
                  Address
                </label>
                <input
                  onChange={handleChangeRegister}
                  value={registerForm.address}
                  type="text"
                  name="address"
                  placeholder="Province, city, or street"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md bg-red-500 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 active:scale-90 hover:text-gray-100"
            >
              Register Now
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-500"></div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-400">
              Already have an account?
              <Link
                to="/login"
                rel="noopener noreferrer"
                className="mx-2 underline text-gray-800 hover:scale-110 hover:text-red-500 hover:font-bold transition-all"
              >
                Log In
              </Link>
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-500"></div>
          </div>
        </div>
      </m.div>
    </>
  );
};

export default RegisterPage;
