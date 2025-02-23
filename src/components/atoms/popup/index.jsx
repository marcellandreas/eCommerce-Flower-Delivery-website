/* eslint-disable react/prop-types */

export const PopUp = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center z-50 lg:mt-[64px]">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative  bg-white py-10  px-4 md:px-20 md:pt-20 md:pb-10 shadow-lg z-50 h-screen w-full lg:w-1/2 border flex flex-col justify-between ">
        {children}
      </div>
    </div>
  );
};
