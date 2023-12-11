import { motion as m } from "framer-motion";
import tableTimeApi from "../config";
import TableRow from "./TableRow";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormModal from "./FormModal";
import FormUpload from "./FormUpload";

const MainTable = ({ submitted, tableRow, setSubmitted }) => {
  const [cuisineData, setCuisineData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const getToken = localStorage.getItem("token");
  const visibleForm = true;

  const fetchDataCuisine = async () => {
    try {
      const { data } = await tableTimeApi.get("/cuisine", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      // console.log(data, "<<<< from Data Axios");

      setCuisineData(data.getCuisine);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const fetchDataCategory = async () => {
    try {
      const { data } = await tableTimeApi.get("/category", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });

      console.log(data, "<<<< from Data Axios");

      setCategoryData(data.getCategory);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    console.log("render");
    fetchDataCuisine();
    fetchDataCategory();
  }, [submitted]);
  return (
    <>
      {/* <!-- Main Table --> */}
      {tableRow === "category" && (
        <table className="table">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th className="w-24">
                <label className="flex items-center justify-center">No</label>
              </th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Row */}
            {categoryData.map((category, index) => (
              <TableRow
                setSubmitted={setSubmitted}
                key={"category" + index}
                dataCategory={category}
                index={index}
                tableRow={tableRow}
              />
            ))}
          </tbody>
        </table>
      )}

      {tableRow === "cuisine" && (
        <>
          <table className="table">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>
                  <label>No</label>
                </th>
                <th>Name</th>
                <th className="w-60">Description</th>
                <th>Price</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Table Row */}
              {cuisineData.map((cuisine, index) => (
                <TableRow
                  key={"cuisine" + index}
                  dataCuisine={cuisine}
                  index={index}
                  tableRow={tableRow}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
export default MainTable;
