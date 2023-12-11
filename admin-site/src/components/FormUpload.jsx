import { motion as m } from "framer-motion";
import tableTimeApi from "../config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const FormUpload = () => {
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const [addDataCuisine, setAddDataCuisine] = useState([]);
  const [formAddCuisine, setFormAddCuisine] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
    categoryId: "",
  });

  const handleChangeAdd = (element) => {
    element.preventDefault();
    const { name, value } = element.target;
    setAddDataCuisine({ ...editDataCuisine, [name]: value });
  };

  const addData = async (element) => {
    element.preventDefault();
    try {
      const { data } = await tableTimeApi.put(
        `/cuisine/${id}`,
        formAddCuisine,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      console.log(data, "<<<< from axios getRegister useEffect");

      navigate("/cuisine");
      Swal.fire({
        title: `Data Updated Sucessfully`,
        timer: 2500,
        showConfirmButton: false,
        color: "#ffffff",
        background: "#218821",
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed flex z-10 justify-center items-center backdrop-blur-sm bg-black/10 w-[100dvw] h-[100dvh]"
      >
        <m.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-100 shadow-2xl bg-white"
        >
          <div className="flex flex-row">
            <div className="justify-start items-start mb-4 w-full space-y-1 text-gray-800 font-bold">
              {/* <img className="h-20 object-contain" /> */}
              <h1 className="text-xl">Add New Category</h1>
              <p className="flex text-xs font-normal text-gray-400 my-4 text-left">
                Gain access to personalize dashboard.
              </p>
            </div>
            <div className="flex top-0 right-0 -mt-12 -mr-12">
              <button className="flex items-center justify-center text-white w-10 h-10 bg-gray-800 hover:bg-red-500 hover:scale-105 transition-all rounded-full active:scale-90">
                x
              </button>
            </div>
          </div>
          <form action="" className="space-y-6">
            <div className="flex flex-row gap-x-3">
              <div className="space-y-1 text-sm w-full">
                <label className="block text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="type new category"
                  className="w-full px-4 py-3 text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md bg-red-500 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 active:scale-90 hover:text-gray-100"
            >
              Add Category
            </button>
          </form>
        </m.div>
      </m.div>
    </>
  );
};

export default FormUpload;
