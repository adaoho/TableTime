import tableTimeLogo from "../assets/tabletime_logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutButton = () => {
    Swal.fire({
      title: "Are you sure want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF385C",
      cancelButtonColor: "#AB8E08",
      confirmButtonText: "Yes, logout!",
      background: "#060702",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Thank you!`,
          text: "Your Account has Been Logout",
          timer: 1500,
          showConfirmButton: false,
          color: "#ffffff",
          background: "#EF4444",
        });
        localStorage.clear();
        navigate("/login");
      }
    });
  };
  return (
    <>
      {/* <!-- SideBar --> */}
      <div className="flex flex-col sticky top-0 h-[100dvh] p-6 w-60 bg-gray-100 text-gray-900 justify-between rounded-md">
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between font-bold text-2xl flex-col">
            <img src={tableTimeLogo} alt="" />
          </div>

          {/* <!-- Input Search --> */}
          <div className="relative mt-2">
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 dark:text-gray-400"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 rounded-md text-sm border-gray-700 bg-gray-200 focus:outline-none focus:ring focus:ring-red-200 placeholder-gray-600 placeholder-opacity-40"
            />
          </div>

          {/* <!-- Input List Bar --> */}
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="group rounded-sm text-gray-600 transition-all hover:border-b-2 hover:border-red-500 hover:text-red-500 active:text-red-300 active:border-red-300">
                <Link
                  to={"/"}
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-400 group-hover:text-red-500 group-active:text-red-300"
                  >
                    <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                  </svg>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="group rounded-sm text-gray-600 transition-all hover:border-b-2 hover:border-red-500 hover:text-red-500 active:text-red-300 active:border-red-300">
                <Link
                  to={"/cuisine"}
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    className="w-5 h-5 fill-current text-gray-400 group-hover:text-red-500 group-active:text-red-300"
                  >
                    <path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z" />
                  </svg>
                  <span>Cuisine</span>
                </Link>
              </li>
              <li className="group rounded-sm text-gray-600 transition-all hover:border-b-2 hover:border-red-500 hover:text-red-500 active:text-red-300 active:border-red-300">
                <Link
                  to={"/category"}
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    className="w-5 h-5 fill-current text-gray-400 group-hover:text-red-500 group-active:text-red-300"
                  >
                    <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
                  </svg>
                  <span>Category</span>
                </Link>
              </li>

              <li className="group rounded-sm text-gray-600 transition-all hover:bg-red-500 hover:text-white active:text-red-300 active:border-red-300">
                <a
                  onClick={() => logoutButton()}
                  rel="noopener noreferrer"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-400 group-hover:text-white group-active:text-red-300"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Profile --> */}
        <Link
          to="/register"
          className="flex tex-xs text-white justify-center items-center p-2 mt-12 space-x-4 justify-self-end mb-8 bg-gray-900 rounded-md shadow-md hover:bg-red-500  hover:scale-105 active:scale-90 transition-all"
        >
          Add New User
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
