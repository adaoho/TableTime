import Checkout from "../components/Checkout";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import tableTimeApi from "../config";

const DetailPage = () => {
  const { id } = useParams();
  // console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableTimeData, setTableTimeData] = useState([]);

  useEffect(() => {
    const fetchTableTimePublic = async () => {
      try {
        setIsLoading(true);
        const { data } = await tableTimeApi.get(`/pub/${id}`);
        // console.log(data, "<<<< from Data Axios");

        setTableTimeData(data.findCuisine);
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
      {/* <Navbar /> */}
      <div className="h-full w-full flex flex-col items-center justify-center">
        {/* <!-- Main Detail --> */}
        {/* {console.log(tableTimeData.imgUrl, "<<< data")} */}
        <div className="mt-28">
          <div className="flex flex-col w-full justify-center items-center">
            {/* <!-- Gallery --> */}
            <div className="flex flex-col h-[434px] w-[1120px] transition-all mb-8">
              <div className="flex flex-row row-span-2 gap-x-2">
                <img
                  src={tableTimeData.imgUrl}
                  className="rounded-xl w-[620px] h-[432px] object-cover"
                />
                <div className="flex flex-row gap-x-2">
                  <div className="flex flex-col gap-y-2">
                    <img
                      src={tableTimeData.imgUrl + "-1"}
                      className="rounded-xl w-[310px] h-[211.5px] object-cover"
                    />
                    <img
                      src={tableTimeData.imgUrl + "-2"}
                      className="rounded-xl w-[310px] h-[211.5px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <img
                      src={tableTimeData.imgUrl + "-3"}
                      className="rounded-xl w-[310px] h-[211.5px] object-cover"
                    />
                    <img
                      src={tableTimeData.imgUrl + "-4"}
                      className="rounded-xl w-[310px] h-[211.5px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Component --> */}
            <div className="grid grid-cols-2 justify-between w-[1120px] h-[800px]">
              {/* <!-- Left Component --> */}
              <div className="flex flex-col bg-white gap-y-2 text-black w-[600px]">
                <div className="max-w-2xl space-y-12">
                  <article className="space-y-2 text-gray-900">
                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold md:tracki md:text-5xl">
                        {tableTimeData.name}
                      </h1>
                      <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                        <div className="flex items-center md:space-x-2">
                          <p className="text-sm">
                            Leroy Jenkins • July 19th, 2021
                          </p>
                        </div>
                        <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                          4 min read • 1,570 views
                        </p>
                      </div>
                    </div>
                  </article>
                  <div>
                    <div className="flex flex-wrap py-6 gap-2 border-t border-dashed border-gray-400 -mt-8">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        className="px-3 py-1 rounded-md hover:underline bg-red-500 text-white"
                      >
                        Food Category
                      </a>
                    </div>
                    <div className="space-y-2 mb-8">
                      <h4 className="text-lg font-semibold">Related posts</h4>
                      <ul className="ml-4 space-y-1 list-disc">
                        <li>
                          <a
                            rel="noopener noreferrer"
                            href="#"
                            className="hover:underline"
                          >
                            Nunc id magna mollis
                          </a>
                        </li>
                        <li>
                          <a
                            rel="noopener noreferrer"
                            href="#"
                            className="hover:underline"
                          >
                            Duis molestie, neque eget pretium lobortis
                          </a>
                        </li>
                        <li>
                          <a
                            rel="noopener noreferrer"
                            href="#"
                            className="hover:underline"
                          >
                            Mauris nec urna volutpat, aliquam lectus sit amet
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="gap-y-4">
                      <p>It is a long established fact that</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Component */}
              <Checkout />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPage;
