/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function FontTextH1({ className = "", children, color = "black" }) {
  return (
    <h1
      className={`text-${color} text-mobileH1 md:text-desktopH1 font-bold ${className}`}
    >
      {children}
    </h1>
  );
}

export function FontTextH2({ className = "", children, color = "black" }) {
  return (
    <h2
      className={`text-${color} text-mobileH2 md:text-desktopH2 font-semibold ${className}`}
    >
      {children}
    </h2>
  );
}

export function FontTextH3({ className = "", children, color = "black" }) {
  return (
    <h3
      className={`text-${color} text-mobileH3 md:text-desktopH3 font-semibold ${className}`}
    >
      {children}
    </h3>
  );
}
export function FontTextH4({ className = "", children, color = "black" }) {
  return (
    <h4
      className={`text-${color} text-mobileH4 md:text-desktopH4 font-semibold ${className}`}
    >
      {children}
    </h4>
  );
}
export function FontTextH5({ className = "", children, color = "black" }) {
  return (
    <h5
      className={`text-${color} text-mobileH5 md:text-desktopH5 font-medium ${className}`}
    >
      {children}
    </h5>
  );
}
export function FontTextH6({ className = "", children, color = "black" }) {
  return (
    <h6
      className={`text-${color} text-mobileH6 md:text-desktopH6 capitalize font-medium ${className}`}
    >
      {children}
    </h6>
  );
}

export function FontTextBody({ className = "", children, color = "black" }) {
  return (
    <p
      className={`text-${color} text-mobileBody md:text-desktopBody font-normal ${className}`}
    >
      {children}
    </p>
  );
}

export function FontTextOverline({
  className = "",
  children,
  color = "black",
}) {
  return (
    <span
      className={`text-${color} text-mobileOverline md:text-desktopOverline uppercase font-medium  ${className}`}
    >
      {children}
    </span>
  );
}

export function FontTextLink({
  className = "",
  children,
  color = "black",
  to = "",
}) {
  return (
    <Link
      to={to}
      className={`text-${color} text-mobileLinks md:text-desktopLinks font-medium ${className}`}
    >
      {children}
    </Link>
  );
}

export function FontTextCaption({ className = "", children, color = "black" }) {
  return (
    <caption
      className={`text-${color} text-mobileCaption md:text-desktopCaption font-medium ${className}`}
    >
      {children}
    </caption>
  );
}
