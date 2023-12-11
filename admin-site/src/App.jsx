import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import router from "./routers/Index";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
