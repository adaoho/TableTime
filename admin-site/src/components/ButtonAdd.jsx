const ButtonAdd = ({ setOnClick, inputButton }) => {
  return (
    <>
      <div
        className="flex justify-center items-center my-2"
        onClick={setOnClick}
      >
        <button className="bg-gray-100 py-3 w-full rounded-md text-gray-600 hover:bg-red-500 hover:text-white hover:scale-105 transition-all font-bold active:scale-95">
          {inputButton}
        </button>
      </div>
    </>
  );
};

export default ButtonAdd;
