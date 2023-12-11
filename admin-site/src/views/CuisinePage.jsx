import { useState } from "react";
import { motion as m } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import ButtonAdd from "../components/ButtonAdd";
import MainTable from "../components/MainTable";
import ProfileBar from "../components/ProfileBar";
import FormModal from "../components/FormModal";

const CuisinePage = () => {
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const type = "cuisine";

  const userEmail = localStorage.getItem("email");
  const [tableRow, setTableRow] = useState("cuisine");
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <FormModal
        setSubmitted={setSubmitted}
        isVisible={visible}
        onClose={setVisible}
        type={type}
      />
      {/* <!-- Table --> */}
      <m.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto w-full p-10"
      >
        <div className="flex flex-row justify-between items-center mb-6">
          <Breadcrumb tableRow={tableRow} />
          {!userEmail || <ProfileBar userEmail={userEmail} />}
        </div>

        <MainTable tableRow={tableRow} submitted={submitted} />
        <ButtonAdd
          setOnClick={() => setVisible(true)}
          inputButton={"+ Add New Cuisine"}
        />
      </m.div>
    </>
  );
};

export default CuisinePage;
