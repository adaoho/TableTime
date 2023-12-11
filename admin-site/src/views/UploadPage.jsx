import tableTimeLogo from "../assets/tabletime_logo.png";
import { motion as m } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import tableTimeApi from "../config";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const UploadPage = () => {
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const [file, setFile] = useState();
  const [getDataUpload, setGetDataUpload] = useState([]);
  const { id } = useParams();

  console.log(id, "<<< from use Params");

  const getFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const fileSubmit = async (element) => {
    element.preventDefault();
    const getToken = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      Swal.fire({
        title: `Your File Being Upload!`,
        timer: 5000,
        showConfirmButton: false,
        timerProgressBar: true,
        color: "#ffffff",
        background: "#32B131",
      });

      const { data } = await tableTimeApi.patch(`/cuisine/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      //   console.log(data, "<<<< from axios getRegister useEffect");

      navigate("/cuisine");
      Swal.fire({
        title: `Image Upload Successfully!`,
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
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await tableTimeApi.get(`/cuisine/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        console.log(data, "<<<< from axios getRegister useEffect");

        setGetDataUpload(data.findCuisine);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

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
              You Will be Replacing Image from {getDataUpload.name} with past
              url image {getDataUpload.imgUrl}
            </p>
          </div>
          <ToastContainer />
          <form action="" className="space-y-6" onSubmit={fileSubmit}>
            <div className="flex flex-row gap-x-3">
              <div className="space-y-1 text-sm w-full">
                <label className="block text-gray-500">Upload Image</label>
                <input
                  onChange={getFile}
                  type="file"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md bg-red-500 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 active:scale-90 hover:text-gray-100"
            >
              Upload Image
            </button>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-500"></div>
            <p className="text-xs text-center sm:px-6 dark:text-gray-400">
              <Link
                to="/cuisine"
                rel="noopener noreferrer"
                className="mx-2 underline text-gray-800 hover:scale-110 hover:text-red-500 hover:font-bold transition-all"
              >
                Back To Cuisine Table?
              </Link>
            </p>
            <div className="flex-1 h-px sm:w-16 bg-gray-500"></div>
          </div>
        </div>
      </m.div>
    </>
  );
};

export default UploadPage;
