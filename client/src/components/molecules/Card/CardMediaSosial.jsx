import PropTypes from "prop-types";
import { memo } from "react";

import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaX,
  FaTelegram,
} from "react-icons/fa6";

export const CardMediaSosial = memo(({ className = "" }) => {
  const socialLinks = [
    { Icon: FaInstagram, label: "Instagram", url: "#" },
    { Icon: FaFacebook, label: "Facebook", url: "#" },
    { Icon: FaPinterest, label: "Pinterest", url: "#" },
    { Icon: FaX, label: "X (Twitter)", url: "#" },
    { Icon: FaTelegram, label: "Telegram", url: "#" },
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
