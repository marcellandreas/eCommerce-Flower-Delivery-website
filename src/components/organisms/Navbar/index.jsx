import React, { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTelegram,
  FaX,
} from "react-icons/fa6";
import CardMediaSosial from "../../molecules/CardMediaSosial";

const Navbar = () => {
  const [activeToggle, setActiveToggle] = useState(false);

  const handleActiveToggle = () => {
    setActiveToggle(!activeToggle);
  };

  const [activeShop, setActiveShop] = useState(false);

  const handleActiveShop = () => {
    setActiveShop(!activeShop);
  };
  return (
    <nav className={`border sticky top-0 z-50 bg-white`}>
      <article className=" hidden lg:flex justify-between h-16 items-center text-black">
        <section className="flex h-full w-1/4">
          <div className="w-1/2 border-r bg-white flex justify-center items-center">
            Shop
          </div>
          <div className="w-1/2 border-r bg-white flex justify-center items-center">
            Contact
          </div>
        </section>
        <section className="flex h-full w-1/4">
          <div className="w-1/2 border-l flex justify-center items-center">
            Sign In
          </div>
          <div className="w-1/2 border-l flex justify-center items-center">
            Cart
          </div>
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
              <p className=" border-b p-5 flex items-center ">Sign In</p>
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
