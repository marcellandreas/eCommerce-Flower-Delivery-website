import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
export const Button = ({
  children,
  onChange,
  onClick,
  type,
  rightIcon,
  leftIcon,
}) => {
  const getButtonClass = () => {
    switch (type) {
      case "primary":
        return "text-white bg-black hover:bg-darkGray disabled:bg-lightGray";
      case "secondary":
        return " text-black border border-black  hover:bg-black hover:text-white disabled:bg-lightGray disabled:text-gray";
      case "tertiary":
        return "text-white border border-white  hover:text-black disabled:bg-lightGray disabled:text-gray";
      default:
        return "border border-black";
    }
  };

  const buttonClass = `max-w-[175px] min-w-[175px]  max-h-[48px] min-h-[48px] md:max-h-[56px] md:min-h-[56px] px-6 py-4  flex justify-center items-center flex-shrink-0 gap-2 text-mobileButton md:text-desktopButton uppercase ${getButtonClass()}`;

  return (
    <button className={buttonClass} onClick={onClick} onChange={onChange}>
      {leftIcon ? <FaArrowLeft size={24} /> : null}
      {children}
      {rightIcon ? <FaArrowRight size={24} /> : null}
    </button>
  );
};

export const CustomButtonLink = ({ children, leftIcon, rightIcon, to }) => {
  return (
    <Link
      to={to}
      className="text-mobileButton font-semibold md:text-desktopButton text-black flex justify-center items-center gap-1 hover:text-gray hover:border-b hover:border-black disabled:text-lightGray"
    >
      {leftIcon && <FaArrowLeft size={24} />}
      {children}
      {rightIcon && <FaArrowRight size={24} />}
    </Link>
  );
};
