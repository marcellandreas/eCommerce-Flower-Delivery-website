import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const PopUp = ({ show, onClose, children }) => {
  // Handle ESC key press
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add/remove event listener
  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [show, handleEscapeKey]);

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 lg:mt-[64px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative bg-white py-10 px-4 md:px-20 md:pt-20 md:pb-10 shadow-lg z-50 h-screen w-full lg:w-1/2 border flex flex-col justify-between animate-fadeIn">
        {children}
      </div>
    </div>
  );
};

PopUp.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};