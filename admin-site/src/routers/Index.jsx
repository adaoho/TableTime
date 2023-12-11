import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import MainPage from "../views/MainPage";
import DashboardAdminPage from "../views/DashboardAdminPage";
import CuisinePage from "../views/CuisinePage";
import CategoryPage from "../views/CategoryPage";
import { ToastContainer, toast } from "react-toastify";
import UploadPage from "../views/UploadPage";
import EditPage from "../views/EditPage";

const router = createBrowserRouter([
  {
    path: "*",
    loader: async () => {
      if (!localStorage.token) {
        toast.warn("You need to login first", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return redirect("/login");
      }

      if (localStorage.token) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: async () => {
      if (!localStorage.token) {
        toast.warn("You need to login first", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/upload/:id",
    element: <UploadPage />,
    loader: async () => {
      if (!localStorage.token) {
        toast.warn("You need to login first", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return redirect("/login");
      }

      return null;
    },
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
    loader: async () => {
      if (!localStorage.token) {
        toast.warn("You need to login first", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return redirect("/login");
      }

      return null;
    },
  },
  {
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <DashboardAdminPage />,
      },
      {
        path: "/cuisine",
        element: <CuisinePage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
    ],
    loader: async () => {
      if (!localStorage.token) {
        toast.warn("You need to login first", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return redirect("/login");
      }

      return null;
    },
  },
]);

export default router;
