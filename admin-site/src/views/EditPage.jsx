import tableTimeLogo from "../assets/tabletime_logo.png";
import { motion as m } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import tableTimeApi from "../config";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const EditPage = () => {
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const { id } = useParams();
  const [getDataEdit, setGetDataEdit] = useState([]);
  const [getDataCategory, setGetDataCategory] = useState([]);

  const [editDataCuisine, setEditDataCuisine] = useState({
    name: "",
    price: "",
    description: "",
    imgUrl: "",
    categoryId: "",
  });

  const handleChangeEdit = (element) => {
    element.preventDefault();
    const { name, value } = element.target;
    setEditDataCuisine({ ...editDataCuisine, [name]: value });
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

        setGetDataEdit(data.findCuisine);
        setEditDataCuisine({
          name: data.findCuisine.name,
          price: data.findCuisine.price,
          description: data.findCuisine.description,
          imgUrl: data.findCuisine.imgUrl,
          categoryId: data.findCuisine.categoryId,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await tableTimeApi.get(`/category`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });

        console.log(data, "<<<< from axios Category useEffect");

        setGetDataCategory(data.getCategory);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory();
  }, []);

  const editData = async (element) => {
    element.preventDefault();
    try {
      const { data } = await tableTimeApi.put(
        `/cuisine/${id}`,
        editDataCuisine,
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
        className="fixed flex z-10 justify-center items-center  bg-white w-screen h-screen"
      >
        <m.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-3 rounded-xl text-gray-100 shadow-2xl bg-white"
        >
          <ToastContainer />
          <div className="flex flex-row">
            <div className="justify-start items-start mb-4 w-full space-y-1 text-gray-800 font-bold">
              <h1 className="text-xl">Edit Cuisine "{getDataEdit.name}"</h1>
              <p className="flex text-xs font-normal text-gray-400 my-4 text-left">
                Gain access to personalize dashboard.
              </p>
            </div>
          </div>
          <form action="" className="space-y-6" onSubmit={editData}>
            <div className="flex flex-row gap-x-3">
              <div className="space-y-1 text-sm">
                <label className="block text-gray-400">Name</label>
                <input
                  onChange={handleChangeEdit}
                  type="text"
                  name="name"
                  placeholder="type your name cuisine"
                  defaultValue={editDataCuisine.name}
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="block text-gray-400">Price</label>
                <input
                  defaultValue={editDataCuisine.price}
                  onChange={handleChangeEdit}
                  type="number"
                  name="price"
                  placeholder="insert price"
                  className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
                />
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Description</label>
              <input
                defaultValue={editDataCuisine.description}
                onChange={handleChangeEdit}
                type="text"
                name="description"
                placeholder="type your description"
                className="w-full px-4 py-3  text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label className="block text-gray-400">Image URL</label>
              <input
                defaultValue={editDataCuisine.imgUrl}
                onChange={handleChangeEdit}
                type="text"
                name="imgUrl"
                placeholder="Insert Link Image"
                className="w-full px-4 py-3 text-gray-800 rounded-md border-gray-700 bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
              />
            </div>
            {/* {console.log(getDataEdit.Category.name, "<<<<<")} */}
            <div className="flex flex-col gap-x-3 text-sm space-y-1">
              <label className="block text-gray-400">Category</label>
              <select
                onChange={handleChangeEdit}
                name="categoryId"
                class="select w-full text-gray-800 rounded-md  bg-gray-100 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40 required"
              >
                {getDataCategory.map((element) => (
                  <option
                    key={element.id}
                    className="text-gray-400"
                    value={element.id}
                  >
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md bg-red-500 text-white font-bold hover:bg-orange-500 transition-all hover:scale-105 active:scale-90 hover:text-gray-100"
            >
              Edit Cuisine
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
        </m.div>
      </m.div>
    </>
  );
};

export default EditPage;
