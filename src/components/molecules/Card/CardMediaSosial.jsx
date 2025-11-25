import PropTypes from "prop-types";
import { memo } from "react";

export const CardMediaSosial = memo(({ className = "" }) => {
  const socialLinks = [
    { Icon: require("react-icons/fa6").FaInstagram, label: "Instagram", url: "#" },
    { Icon: require("react-icons/fa6").FaFacebook, label: "Facebook", url: "#" },
    { Icon: require("react-icons/fa6").FaPinterest, label: "Pinterest", url: "#" },
    { Icon: require("react-icons/fa6").FaX, label: "X (Twitter)", url: "#" },
    { Icon: require("react-icons/fa6").FaTelegram, label: "Telegram", url: "#" },
  ];

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {socialLinks.map(({ Icon, label, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-200"
          aria-label={label}
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  );
});

CardMediaSosial.displayName = "CardMediaSosial";

CardMediaSosial.propTypes = {
  className: PropTypes.string,
};