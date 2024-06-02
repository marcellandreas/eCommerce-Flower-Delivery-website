import React from "react";
import { InputText } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import Divider from "../../atoms/Divider";
import WrapMediaSosial from "../../atoms/WrapMediaSosial";

const PopUp = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 lg:mt-[64px]">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative  bg-white py-10  px-4 md:px-20 md:pt-20 md:pb-10 shadow-lg z-50 h-screen w-full lg:w-1/2 border flex flex-col justify-between ">
        <div className="">
          <button
            className="absolute top-2 right-2 text-gray-600 w-5"
            onClick={onClose}
          >
            X
          </button>
          <div>
            <h2 className=" text-desktopH2 font-semibold mb-4">
              Greetings! Welcome to luxury gift shop
            </h2>
          </div>
          <div className="flex gap-4 flex-col">
            <InputText
              placeholder="+62 xxx xxxx xxxx"
              label="Use Your Mobile number to sign up or log in"
            />
            <Button type="primary">CONTINUE</Button>
          </div>
          <Divider />
          <WrapMediaSosial />
        </div>
        <div className=" mt-10 flex gap-5 justify-center items-center md:items-end flex-col md:flex-row">
          <p className=" underline cursor-pointer">Privacy Policy</p>
          <p className=" hidden md:block">|</p>
          <p className=" underline cursor-pointer">Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
