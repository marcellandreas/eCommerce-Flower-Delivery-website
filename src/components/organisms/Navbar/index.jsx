import { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import CardMediaSosial from "../../molecules/CardMediaSosial";
import LoginPopUp from "../../molecules/PopUp/LoginPopUp";
import usePopUp from "../../../utils/usePopUp";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeToggle, setActiveToggle] = useState(false);

  const handleActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const { showPopUp, handleOpenPopUp, handleClosePopUp } = usePopUp();

  return (
    <nav className={`border sticky top-0 z-50 bg-white`}>
      <article className=" hidden lg:flex justify-between h-16 items-center text-black">
        <section className="flex h-full w-1/4">
          <Link
            to="/shop"
            className="w-1/2 border-r bg-white flex justify-center items-center"
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="w-1/2 border-r bg-white flex justify-center items-center"
          >
            Contact
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
            to="/cart"
            className="  w-1/2 border-l flex justify-center items-center"
          >
            Cart
          </Link>
        </section>
      </article>
      <article className=" lg:hidden flex justify-between h-16 items-center text-black">
        <button
          onClick={handleActiveToggle}
          className="flex border-r h-full w-16 justify-center items-center "
        >
          <GiHamburgerMenu />
        </button>
        <button className="flex border-l h-full w-16 justify-center items-center ">
          <RiShoppingBagFill />
        </button>
      </article>
      <LoginPopUp show={showPopUp} onClose={handleClosePopUp} />
      <div className=" lg:hidden">
        {activeToggle ? (
          <div className=" absolute top-0 md:w-1/2 w-full h-screen bg-white ">
            <div className="flex flex-col  h-full  ">
              <p
                onClick={handleActiveToggle}
                className=" p-5 cursor-pointer border-b"
              >
                X
              </p>
              <p
                onClick={handleOpenPopUp}
                className=" border-b p-5 flex items-center "
              >
                Sign In
              </p>
              <p className=" border-b p-5">Service</p>
              <p className=" border-b p-5">Contact</p>
              <p className=" border-b p-5">About us</p>
              <p className="flex flex-col border-b p-5">
                <span>Shipping & returns</span>
                <span>Terms & Condision</span>
                <span>Privacy Policy</span>
              </p>
              <CardMediaSosial className={`p-5`} />
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
