const CategoryBar = () => {
  return (
    <>
      {/* <!-- Category bar --> */}

      <div className="h-24 w-screen flex items-center justify-center space-x-5 fixed top-20 bg-white shadow-md z-10">
        <div className="flex items-center space-x-10 justify-center">
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="M804-282q17 9 30-4t4-30l-58-108-42 108 66 34Zm-200-38h48l96-238q3-8-1.5-13.5T736-580l-80-32q-9-3-17.5 2T628-596l-24 276Zm-296 0h48l-24-276q-2-11-10.5-15t-17.5-1l-80 32q-8 3-11.5 8.5T212-558l96 238Zm-152 38 66-34-42-108-58 108q-9 17 4 30t30 4Zm280-38h88l30-338q2-9-4.5-15.5T534-680H426q-8 0-14.5 6.5T406-658l30 338ZM138-200q-42 0-70-31.5T40-306q0-12 3.5-23.5T52-352l88-168q-14-40 1-79t53-55l80-32q14-5 28-7t28 1q14-29 39-48.5t57-19.5h108q32 0 57 19.5t39 48.5q14-2 28-.5t28 6.5l80 32q40 16 56 55t-2 77l88 168q6 11 9 23t3 25q0 45-30.5 75.5T814-200q-11 0-22-2.5t-22-7.5l-62-30H250l-56 30q-13 7-27.5 8.5T138-200Zm342-280Z" />
            </svg>
            <p className="text-xs font-normal">Bakery Dining</p>
          </div>
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="M480-80 80-680q85-72 186.5-116T480-840q112 0 213.5 43.5T880-680L480-80Zm0-144 292-438q-65-45-139-71.5T480-760q-79 0-152.5 26.5T188-662l292 438ZM380-560q25 0 42.5-17.5T440-620q0-25-17.5-42.5T380-680q-25 0-42.5 17.5T320-620q0 25 17.5 42.5T380-560Zm100 200q25 0 42.5-17.5T540-420q0-25-17.5-42.5T480-480q-25 0-42.5 17.5T420-420q0 25 17.5 42.5T480-360Zm0 136Z" />
            </svg>
            <p className="text-xs font-normal">Local Pizza</p>
          </div>
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="m160-120-80-80h800l-80 80H160Zm-40-120q6-18 16-34t24-30v-296h-40v-60h40v-30h-40v-60h40v-30h-40v-60h280q33 0 56.5 23.5T480-760v10h360v60H480v10q0 33-23.5 56.5T400-600h-80v244q14 2 28 6t26 12q26-65 83-103.5T583-480q90 0 153.5 61.5T800-268v28H120Zm334-80h252q-17-36-50-58t-73-22q-42 0-77 21t-52 59ZM320-750h80v-30h-80v30Zm0 90h80v-30h-80v30Zm-100-90h40v-30h-40v30Zm0 90h40v-30h-40v30Zm0 314q10-5 19.5-7.5T260-358v-242h-40v254Zm360 26Z" />
            </svg>
            <p className="text-xs font-normal">Dinner Dining</p>
          </div>
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm400-320h240v-160H560v160ZM160-280h320v-400H160v400Zm160-140q-25 0-42.5-17.5T260-480q0-25 17.5-42.5T320-540q25 0 42.5 17.5T380-480q0 25-17.5 42.5T320-420Zm240 140h240v-160H560v160Z" />
            </svg>
            <p className="text-xs font-normal">Bento Food</p>
          </div>
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="M640-80q-67 0-101.5-22.5T480-150q-19-20-36.5-35T399-200q-45 0-100-15.5t-103.5-51Q147-302 114-359T80-499q-2-167 82.5-274T399-880q71 0 120 20.5t84.5 51.5q35.5 31 60 68.5T710-667q12 20 24 36.5t26 30.5q60 60 90 105t30 136q0 120-74.5 199.5T640-80Zm0-80q57 0 108.5-56.5T800-359q0-66-19.5-97T704-544q-21-20-37.5-44.5T633-639q-41-65-87-113t-147-48q-129 0-185 92.5T160-500q1 67 29 110t66.5 67.5Q294-298 334-289t65 9q51 0 82 24.5t51 45.5q22 23 42.5 36.5T640-160ZM480-340q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41Zm-1-140Z" />
            </svg>
            <p className="text-xs font-normal">Egg Based</p>
          </div>
          <div className="group flex flex-col items-center text-gray-400 gap-2 transition-all hover:text-black hover:border-b-2 hover:border-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className="fill-current"
            >
              <path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-480h320-400 80Zm400 120h80v-120h-80v120ZM560-360q33 0 56.5-23.5T640-440v-320H400v16l72 58q2 2 8 16v170q0 8-6 14t-14 6H300q-8 0-14-6t-6-14v-170q0-2 8-16l72-58v-16H240v320q0 33 23.5 56.5T320-360h240ZM360-760h40-40Z" />
            </svg>
            <p className="text-xs font-normal">Beverage Drink</p>
          </div>
        </div>
        <span className="material-symbols-outlined pl-4">
          arrow_circle_right
        </span>
        <div className="flex justify-around items-center rounded-xl shadow-md h-12 w-24 border">
          <span className="material-symbols-outlined pl-2">sync_alt</span>
          <p className="text-xs font-medium pr-2">Filters</p>
        </div>
      </div>
    </>
  );
};

export default CategoryBar;
