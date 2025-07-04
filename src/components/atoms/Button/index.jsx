import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  onChange,
  onClick,
  type,
  rightIcon,
  leftIcon,
  className,
  disabled = false,
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

  const buttonClass = ` w-full max-h-[48px] min-h-[48px] md:max-h-[56px] md:min-h-[56px] px-6 py-4  flex justify-center items-center flex-shrink-0 gap-2 text-mobileButton md:text-desktopButton uppercase ${getButtonClass()} ${className}`;
  //max-w-[175px] min-w-[175px]
  return (
    <button
      type="submit"
      className={buttonClass}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
    >
      {leftIcon ? <FaArrowLeft size={24} /> : null}
      {children}
      {rightIcon ? <FaArrowRight size={24} /> : null}
    </button>
  );
};
