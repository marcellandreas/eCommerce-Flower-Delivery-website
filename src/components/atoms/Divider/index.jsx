import PropTypes from "prop-types";

export const Divider = ({ text = "or", className = "" }) => {
  return (
    <div className={`flex items-center py-4 ${className}`} role="separator" aria-label={text}>
      <div className="flex-grow border-t border-gray-300" aria-hidden="true" />
      <span className="mx-4 text-gray-500 text-sm font-medium">{text}</span>
      <div className="flex-grow border-t border-gray-300" aria-hidden="true" />
    </div>
  );
};

Divider.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};