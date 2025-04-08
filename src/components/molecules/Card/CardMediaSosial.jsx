import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTelegram,
  FaX,
} from "react-icons/fa6";

export function CardMediaSosial({ className }) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <span>
        <FaInstagram size={22} />
      </span>
      <span>
        <FaFacebook size={22} />
      </span>
      <span>
        <FaPinterest size={22} />
      </span>
      <span>
        <FaX size={22} />
      </span>
      <span>
        <FaTelegram size={22} />
      </span>
    </div>
  );
}
