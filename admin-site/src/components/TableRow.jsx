import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import tableTimeApi from "../config";
import { useEffect } from "react";

const TableRow = ({
  index,
  dataCuisine,
  tableRow,
  dataCategory,
  setSubmitted,
}) => {
  const currencyFormatted = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const [getDataCategory, setGetDataCategory] = useState([]);
  const [getDataCuisine, setGetDataCuisine] = useState([]);
  const getToken = localStorage.getItem("token");
  const getRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const editToPage = (id) => {
    navigate(`/edit/${id}`);
  };
  const uploadToPage = (id) => {
    navigate(`/upload/${id}`);
  };

  const deleteButtonCategory = async (id) => {
    Swal.fire({
      title: "Are you sure want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF385C",
      cancelButtonColor: "#AB8E08",
      confirmButtonText: "Yes, Delete Data!",
      background: "#060702",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Data Has Been Delete`,
          timer: 1500,
          showConfirmButton: false,
          color: "#ffffff",
          background: "#EF4444",
        });

        const { data } = tableTimeApi.delete(`/category/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });

        navigate("/category");
      }
    });

    console.log(data, "<<<< from delete");
  };

  const deleteButtonCuisine = async (id) => {
    Swal.fire({
      title: "Are you sure want to delete this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF385C",
      cancelButtonColor: "#AB8E08",
      confirmButtonText: "Yes, Delete Data!",
      background: "#060702",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Data Has Been Delete`,
          timer: 1500,
          showConfirmButton: false,
          color: "#ffffff",
          background: "#EF4444",
        });

        const { data } = tableTimeApi.delete(`/category/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        console.log(data, "<<<< from delete");

        navigate("/category");
      }
    });
  };

  const fetchCategory = async () => {
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

  const fetchCuisine = async () => {
    try {
      const { data } = await tableTimeApi.get(`/category`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      console.log(data, "<<<< from axios Category useEffect");

      setGetDataCuisine(data.getCuisine);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchCuisine();
  }, []);

  return (
    <>
      {/* <!-- row 1 --> */}
      {tableRow === "cuisine" && (
        <tr>
          <th className="flex">{index + 1}</th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={dataCuisine.imgUrl}
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{dataCuisine.name}</div>
                <div className="text-sm opacity-50">
                  {dataCuisine.Category.name}
                </div>
              </div>
            </div>
          </td>
          <td>
            {dataCuisine.description}
            <br />
          </td>
          <td className="font-bold">{currencyFormatted(dataCuisine.price)}</td>
          <td className="text-green-600">{dataCuisine.User.email}</td>
          <th className="flex gap-1 items-center justify-center">
            {/* Upload Icon */}
            <button
              onClick={() => uploadToPage(dataCuisine.id)}
              className="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-gray-700 hover:scale-110 transition-all active:scale-90 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                className="fill-current"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
              </svg>
            </button>
            {/* Edit Icon */}
            <button className="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-green-700 hover:scale-110 transition-all active:scale-90 hover:text-white">
              <svg
                onClick={() => editToPage(dataCuisine.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                className="fill-current"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
            {!getRole === "admin" && (
              <>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await deleteButtonCuisine(dataCuisine.id);
                    setSubmitted((prev) => !prev);
                  }}
                  className="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-red-600 hover:scale-110 transition-all active:scale-90 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    className="fill-current"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </>
            )}
          </th>
        </tr>
      )}

      {tableRow === "category" && (
        <tr>
          <th className="flex justify-center items-center">{index + 1}</th>
          <td>
            <div className="flex items-center space-x-3">
              <div>
                <div className="font-bold">{dataCategory.name}</div>
              </div>
            </div>
          </td>
          <th className="flex gap-1 items-center justify-center">
            {/* <button className="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-green-700 hover:scale-110 transition-all active:scale-90 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                className="fill-current"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button> */}
            <button
              onClick={async (e) => {
                e.preventDefault();
                await deleteButtonCategory(dataCategory.id);
                setSubmitted((prev) => !prev);
              }}
              className="bg-gray-100 text-gray-500 p-1 rounded-md hover:bg-red-600 hover:scale-110 transition-all active:scale-90 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 -960 960 960"
                className="fill-current"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </th>
        </tr>
      )}
    </>
  );
};

export default TableRow;
