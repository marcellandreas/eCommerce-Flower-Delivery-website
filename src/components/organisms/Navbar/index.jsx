import { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation, Link } from "react-router-dom";
import CardMediaSosial from "../../molecules/CardMediaSosial";
import LoginPopUp from "../../molecules/PopUp/LoginPopUp";
import usePopUp from "../../../utils/usePopUp";

const Navbar = () => {
  const [activeToggle, setActiveToggle] = useState(false);
  const { pathname } = useLocation(); // Ambil path saat ini

  const handleActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const { showPopUp, handleOpenPopUp, handleClosePopUp } = usePopUp();

  // Fungsi untuk mendapatkan label navbar & path tujuan
  const getNavItem = (path, label) => ({
    to: pathname === path ? "/" : path,
    label: pathname === path ? "Home" : label,
  });

  return (
    <nav className={`border sticky top-0 z-50 bg-white`}>
      <article className="hidden lg:flex justify-between h-16 items-center text-black">
        <section className="flex h-full w-1/4">
          <Link
            to={getNavItem("/shop", "Shop").to}
            className="w-1/2 border-r bg-white flex justify-center items-center"
          >
            {getNavItem("/shop", "Shop").label}
          </Link>
          <Link
            to={getNavItem("/contact", "Contact").to}
            className="w-1/2 border-r bg-white flex justify-center items-center"
          >
            {getNavItem("/contact", "Contact").label}
          </Link>
        </section>
        <section className="flex h-full w-1/4">
          <button
            onClick={handleOpenPopUp}
            className="w-1/2 border-l flex justify-center items-center"
          >
            Sign In
          </button>
          <Link
            to={getNavItem("/cart", "Cart").to}
            className="w-1/2 border-l flex justify-center items-center"
          >
            {getNavItem("/cart", "Cart").label}
          </Link>
        </section>
      </article>
      <article className="lg:hidden flex justify-between h-16 items-center text-black">
        <button
          onClick={handleActiveToggle}
          className="flex border-r h-full w-16 justify-center items-center"
        >
          <GiHamburgerMenu />
        </button>
        <button className="flex border-l h-full w-16 justify-center items-center">
          <RiShoppingBagFill />
        </button>
      </article>
      <LoginPopUp show={showPopUp} onClose={handleClosePopUp} />
      <div className="lg:hidden">
        {activeToggle ? (
          <div className="absolute top-0 md:w-1/2 w-full h-screen bg-white">
            <div className="flex flex-col h-full">
              <p
                onClick={handleActiveToggle}
                className="p-5 cursor-pointer border-b"
              >
                X
              </p>
              <p
                onClick={handleOpenPopUp}
                className="border-b p-5 flex items-center"
              >
                Sign In
              </p>
              <p className="border-b p-5">
                <Link to={getNavItem("/service", "Service").to}>
                  {getNavItem("/service", "Service").label}
                </Link>
              </p>
              <p className="border-b p-5">
                <Link to={getNavItem("/contact", "Contact").to}>
                  {getNavItem("/contact", "Contact").label}
                </Link>
              </p>
              <p className="border-b p-5">
                <Link to={getNavItem("/about", "About Us").to}>
                  {getNavItem("/about", "About Us").label}
                </Link>
              </p>
              <p className="flex flex-col border-b p-5">
                <span>Shipping & Returns</span>
                <span>Terms & Conditions</span>
                <span>Privacy Policy</span>
              </p>
              <CardMediaSosial className="p-5" />
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
