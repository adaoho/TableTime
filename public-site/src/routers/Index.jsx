import { createBrowserRouter, redirect } from "react-router-dom";
import MainDashboard from "../views/MainDashboard";
import DashboardPage from "../views/DashboardPage";
import DetailPage from "../views/DetailPage";

const router = createBrowserRouter([
  {
    // Handle endpoint kalau diketik bebas oleh user
    path: "*",
    element: <DashboardPage />,
  },
  {
    element: <MainDashboard />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/cuisine/:id",
        element: <DetailPage />,
        // loader: async () => {
        //   if (!localStorage.access_token) {
        //     return redirect("/");
        //   }

        //   return null;
        // },
      },
    ],
  },
]);

export default router;
