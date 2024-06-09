/* eslint-disable react/prop-types */
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

export function FontTextBody({ className = "", children, color = "black" }) {
  return (
    <h3
      className={`text-${color} text-mobileBody md:text-desktopBody font-normal ${className}`}
    >
      {children}
    </h3>
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
