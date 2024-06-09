import { useNavigate } from "react-router-dom";

export default function useBackMenu() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return handleBack;
}
