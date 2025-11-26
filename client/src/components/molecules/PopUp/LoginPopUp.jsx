import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { InputText, PopUp, Button, Divider } from "../../atoms";
import { SocialLoginButtons } from "../SocialLoginButtons";

const FOOTER_LINKS = [
  { label: "Privacy Policy", url: "#" },
  { label: "Terms and Conditions", url: "#" },
];

const LoginPopUp = ({ onClose, show }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setError("");
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    // Handle login logic here
    console.log("Login with phone:", phoneNumber);
    onClose();
  }, [phoneNumber, onClose]);

  const handleGoogleLogin = useCallback(() => {
    console.log("Google login");
    // Implement Google login
  }, []);

  const handleAppleLogin = useCallback(() => {
    console.log("Apple login");
    // Implement Apple login
  }, []);

  return (
    <PopUp onClose={onClose} show={show}>
      <div className="flex-1">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-mobileH2 md:text-desktopH2 font-semibold mb-2">
            Greetings!
          </h2>
          <p className="text-gray-600">Welcome to luxury gift shop</p>
        </div>

        {/* Phone Login Form */}
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <InputText
            placeholder="+62 xxx xxxx xxxx"
            type="tel"
            name="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            label="Use Your Mobile number to sign up or log in"
            required
          />
          {error && (
            <p className="text-error text-sm -mt-2" role="alert">
              {error}
            </p>
          )}
          <Button type="primary">CONTINUE</Button>
        </form>

        <Divider />

        {/* Social Login */}
        <SocialLoginButtons
          onGoogleLogin={handleGoogleLogin}
          onAppleLogin={handleAppleLogin}
        />
      </div>

      {/* Footer Links */}
      <footer className="mt-10 flex gap-5 justify-center items-center md:items-end flex-col md:flex-row text-sm">
        {FOOTER_LINKS.map((link, index) => (
          <div key={link.label} className="flex items-center gap-5">
            <a
              href={link.url}
              className="underline cursor-pointer hover:text-gray-600 transition-colors duration-200"
            >
              {link.label}
            </a>
            {index < FOOTER_LINKS.length - 1 && (
              <span className="hidden md:block text-gray-400">|</span>
            )}
          </div>
        ))}
      </footer>
    </PopUp>
  );
};

LoginPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginPopUp;