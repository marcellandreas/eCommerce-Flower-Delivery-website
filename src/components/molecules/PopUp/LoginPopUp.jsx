/* eslint-disable react/prop-types */
import PopUp from "../../atoms/popup";
import { InputText } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import Divider from "../../atoms/Divider";
import { SocialLoginButtons } from "../SocialLoginButtons";

const LoginPopUp = ({ onClose, show }) => {
  return (
    <PopUp onClose={onClose} show={show}>
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
            type="number"
            label="Use Your Mobile number to sign up or log in"
          />
          <Button type="primary">CONTINUE</Button>
        </div>
        <Divider />
        <SocialLoginButtons />
      </div>
      <div className=" mt-10 flex gap-5 justify-center items-center md:items-end flex-col md:flex-row">
        <p className=" underline cursor-pointer">Privacy Policy</p>
        <p className=" hidden md:block">|</p>
        <p className=" underline cursor-pointer">Terms and Conditions</p>
      </div>
    </PopUp>
  );
};

export default LoginPopUp;
