import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
import CategoryBar from "../components/CategoryBar";
import Searchbar from "../components/Searchbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import tableTimeApi from "../config";

const DashboardPage = () => {
  const [error, setError] = useState(null);
  const [tableTimeData, setTableTimeData] = useState([]);
  const [page, setPage] = useState([]);
  const [fromSearch, setFromSearch] = useState("");

  useEffect(() => {
    const fetchTableTimePublic = async () => {
      try {
        const { data } = await tableTimeApi.get("/pub");
        // console.log(data, "<<<< from Data Axios");
        const forPage = {
          currentPage: data.currentPage,
          totalPage: data.totalPage,
        };

        setTableTimeData(data.getCuisine);
        setPage(forPage);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchTableTimePublic();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-full w-full flex flex-col items-center">
        <CategoryBar />

        <Searchbar />
        {/* {isLoading && <Loading />} */}

        {/* Card Gallery */}
        <div className="mt-10">
          <div className="grid grid-cols-4 gap-y-4 w-full gap-x-10">
            {tableTimeData.map((tableTimeData, index) => (
              <Card
                key={"tableTime" + index}
                tableTimeData={tableTimeData}
                index={index}
              />
            ))}
          </div>
          <div className="divider"></div>
        </div>

        <Pagination pageData={page} />
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
