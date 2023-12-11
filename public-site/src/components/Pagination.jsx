const Pagination = ({ pageData }) => {
  return (
    <>
      {/* <!-- Pagination --> */}
      {/* {console.log(pageData, "<<<< From Page Data")} */}
      <div className="items-center space-y-2 text-sm sm:space-y-0 sm:space-x-3 sm:flex mb-20">
        <span className="block">
          Page {pageData.currentPage} of {pageData.totalPage}
        </span>
        <div className="space-x-1">
          <button
            title="previous"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-gray-700 stroke-gray-900 hover:stroke-white hover:scale-105 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            title="next"
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-gray-700 stroke-gray-900 hover:stroke-white hover:scale-105 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
