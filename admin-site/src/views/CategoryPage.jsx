import { motion as m } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import ButtonAdd from "../components/ButtonAdd";
import MainTable from "../components/MainTable";
import ProfileBar from "../components/ProfileBar";
import { useState } from "react";
import FormModal from "../components/FormModal";

const CategoryPage = () => {
  const type = "category";
  const variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  const userEmail = localStorage.getItem("email");
  const [tableRow, setTableRow] = useState("category");
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

        <MainTable
          tableRow={tableRow}
          submitted={submitted}
          setSubmitted={setSubmitted}
        />
        <ButtonAdd
          setOnClick={() => setVisible(true)}
          inputButton={"+ Add New Category"}
        />
      </m.div>
    </>
  );
};

export default CategoryPage;
