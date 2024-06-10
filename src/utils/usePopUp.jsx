import { useState } from "react";

const usePopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleOpenPopUp = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return {
    showPopUp,
    handleOpenPopUp,
    handleClosePopUp,
  };
};

export default usePopUp;
