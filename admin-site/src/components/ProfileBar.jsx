const ProfileBar = ({ userEmail }) => {
  return (
    <>
      {/* <!-- Profile --> */}
      <div className="flex justify-end items-center py-1.25 pr-2 pl-3 gap-2 rounded-full shadow-md h-10 border">
        <p className="text-xs text-gray-400 mr-[8px] ml-4">{userEmail}</p>
        <p className="bg-red-500 text-white rounded-full w-7 h-7 text-center pt-1.5 text-[10px] font-semibold"></p>
      </div>
    </>
  );
};

export default ProfileBar;
