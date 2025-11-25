import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

// Constants untuk button styles
const BUTTON_VARIANTS = {
  primary: "text-white bg-black hover:bg-darkGray disabled:bg-lightGray",
  secondary: "text-black border border-black hover:bg-black hover:text-white disabled:bg-lightGray disabled:text-gray",
  tertiary: "text-white border border-white hover:text-black disabled:bg-lightGray disabled:text-gray"
};

const BASE_BUTTON_CLASSES = "w-full max-h-[48px] min-h-[48px] md:max-h-[56px] md:min-h-[56px] px-6 py-4 flex justify-center items-center flex-shrink-0 gap-2 text-mobileButton md:text-desktopButton uppercase transition-colors duration-200";

export const Button = ({
  children,
  onChange,
  onClick,
  type = "primary",
  rightIcon = false,
  leftIcon = false,
  className = "",
  disabled = false,
}) => {
  const buttonClasses = `${BASE_BUTTON_CLASSES} ${BUTTON_VARIANTS[type] || BUTTON_VARIANTS.primary} ${className}`;

  return (
    <button
      type="submit"
      className={buttonClasses}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {leftIcon && <FaArrowLeft size={24} aria-hidden="true" />}
      {children}
      {rightIcon && <FaArrowRight size={24} aria-hidden="true" />}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  rightIcon: PropTypes.bool,
  leftIcon: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};