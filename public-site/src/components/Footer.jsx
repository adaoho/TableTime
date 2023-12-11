const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="h-12 fixed bottom-0 w-screen bg-gray-100 flex justify-between items-center px-10">
        <div className="flex space-x-2 text-sm font-base">
          <p>© 2023 Table Time, Inc.</p>
          <p>·</p>
          <p>Privacy</p>
          <p>·</p>
          <p>Terms</p>
          <p>·</p>
          <p>Developer Site</p>
          <p>·</p>
          <p>Company details</p>
        </div>
        <div className="flex space-x-4 text-sm font-medium">
          <span className="material-symbols-outlined">language</span>
          <p>English(EN)</p>
          <p>Rp IDR</p>
          <p>Support & resources</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
