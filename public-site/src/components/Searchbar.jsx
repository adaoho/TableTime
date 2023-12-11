import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import tableTimeApi from "../config";

const Searchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (element) => {
    element.preventDefault();
    const { name, value } = element.target;

    setSearch({ ...search, [name]: value });
  };

  const handleOnSubmit = async (element) => {
    try {
      element.preventDefault();
      console.log(search.name);
      const { data } = await tableTimeApi.get(`/pub?name=${search.name}`);
      console.log(data, "from data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex justify-center w-screen mt-52 ">
        <div
          id="box"
          className="flex items-center justify-between rounded-xl p-4 border w-[600px] h-16 focus:outline-none focus:outline-2"
        >
          <div className="w-[660px] flex flex-between items-center flex-row">
            <p className="border-r-2 border-gray-300 pr-4 text-base font-medium">
              Find your Taste
            </p>
            <form className="flex justify-between" onSubmit={handleOnSubmit}>
              <input
                type="text"
                className="w-[24em] border-gray-100 text-base text-gray-400 pl-4 active focus:outline-none "
                placeholder="type food name ..."
                value={search.name}
                name="name"
                onChange={handleSearch}
              />
              <button className="right-2" type="submit">
                <i className="fa-solid fa-magnifying-glass bg-red-500 text-white rounded-full p-2"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Searchbar;
