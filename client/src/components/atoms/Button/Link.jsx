import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

// Constants
const BUTTON_VARIANTS = {
  primary: "text-white bg-black hover:bg-darkGray disabled:bg-lightGray",
  secondary: "text-black border border-black hover:bg-black hover:text-white disabled:bg-lightGray disabled:text-gray",
  tertiary: "text-white border border-white hover:text-black disabled:bg-lightGray disabled:text-gray"
};

const BASE_BUTTON_CLASSES = "w-full max-h-[48px] min-h-[48px] md:max-h-[56px] md:min-h-[56px] px-6 py-4 flex justify-center items-center flex-shrink-0 gap-2 text-mobileButton md:text-desktopButton uppercase transition-colors duration-200";

export const LinkButton = ({
  children,
  onChange,
  onClick,
  type = "primary",
  rightIcon = false,
  leftIcon = false,
  to = "/",
  className = "",
}) => {
  const buttonClasses = `${BASE_BUTTON_CLASSES} ${BUTTON_VARIANTS[type] || BUTTON_VARIANTS.primary} ${className}`;

  return (
    <Link 
      to={to} 
      className={buttonClasses} 
      onClick={onClick} 
      onChange={onChange}
      aria-label={typeof children === 'string' ? children : 'Link'}
    >
      {leftIcon && <FaArrowLeft size={24} aria-hidden="true" />}
      {children}
      {rightIcon && <FaArrowRight size={24} aria-hidden="true" />}
    </Link>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  rightIcon: PropTypes.bool,
  leftIcon: PropTypes.bool,
  to: PropTypes.string,
  className: PropTypes.string,
};

export const CustomNavLink = ({ 
  children, 
  leftIcon = false, 
  rightIcon = false, 
  to = "/" 
}) => {
  return (
    <Link
      to={to}
      className="text-mobileButton font-semibold md:text-desktopButton text-black flex justify-center items-center gap-1 hover:text-gray hover:border-b hover:border-black disabled:text-lightGray rotate-text transition-colors duration-200"
      aria-label={typeof children === 'string' ? children : 'Navigation link'}
    >
      {leftIcon && <FaArrowLeft size={24} aria-hidden="true" />}
      {children}
      {rightIcon && <FaArrowRight size={24} aria-hidden="true" />}
    </Link>
  );
};

CustomNavLink.propTypes = {
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  to: PropTypes.string,
};