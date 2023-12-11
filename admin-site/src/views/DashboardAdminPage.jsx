import Breadcrumb from "../components/Breadcrumb";
import MainTable from "../components/MainTable";
import ProfileBar from "../components/ProfileBar";
import ButtonAdd from "../components/ButtonAdd";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FormModal from "../components/FormModal";
import tableTimeApi from "../config";

const DashboardAdminPage = () => {
  const userEmail = localStorage.getItem("email");
  const getToken = localStorage.getItem("token");
  const [getDataCategory, setGetDataCategory] = useState([]);
  const [getDataCuisine, setGetDataCuisine] = useState([]);

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
      const { data } = await tableTimeApi.get(`/cuisine`, {
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
      <FormModal />
      {/* <!-- Table --> */}
      <div className="overflow-x-auto w-full p-10">
        <div className="flex flex-row justify-between items-center mb-6">
          <Breadcrumb />

          {!userEmail || <ProfileBar userEmail={userEmail} />}
        </div>

        <div className="h-[320px] flex flex-row space-x-4 justify-center items-center">
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Total Data Cuisine</div>
              <div class="stat-value">{getDataCuisine.length}</div>
              <div class="stat-desc">This is your cuisine total data</div>
            </div>
          </div>
          <div class="stats shadow">
            <div class="stat">
              <div class="stat-title">Total Data Category</div>
              <div class="stat-value">{getDataCategory.length}</div>
              <div class="stat-desc">This is your category total data</div>
            </div>
          </div>
        </div>

        <MainTable />
      </div>
    </>
  );
};

export default DashboardAdminPage;
