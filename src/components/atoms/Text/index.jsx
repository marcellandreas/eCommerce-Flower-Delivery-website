import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Text = ({
  level = "body",
  className,
  children,
  color,
  textStyle,
  dataAos,
  to,
}) => {
  // Mapping tag yang aman berdasarkan level
  const tagMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle: "p",
    body: "p",
    button: "span",
    link: Link,
    overline: "span",
    caption: "p", // ✅ caption pakai <p>
    captionSmall: "span", // ✅ captionSmall pakai <span>
  };

  // Styling class sesuai level
  const levels = {
    h1: "text-mobileH1 md:text-desktopH1 font-bold",
    h2: "text-mobileH2 md:text-desktopH2 font-semibold",
    h3: "text-mobileH3 md:text-desktopH3 font-semibold",
    h4: "text-mobileH4 md:text-desktopH4 font-semibold",
    h5: "text-mobileH5 md:text-desktopH5 font-medium",
    h6: "text-mobileH6 md:text-desktopH6 capitalize font-medium",
    subtitle: "text-mobileSub md:text-desktopSub font-normal",
    body: "text-mobileBody md:text-desktopBody font-normal",
    button: "text-mobileButton uppercase md:text-desktopB font-normal",
    link: "text-mobileLinks md:text-desktopLinks font-medium",
    overline:
      "text-mobileOverline md:text-desktopOverline uppercase font-medium",
    caption: "text-mobileCaption md:text-desktopCaption font-normal",
    captionSmall:
      "text-mobileCaptionSmall md:text-desktopCaptionSmall font-medium",
  };

  const Component = tagMap[level] || "p";
  const textStyleClass = levels[level] || "";

  const combinedClassNames = `${textStyleClass} ${textStyle || ""} ${
    className || ""
  }`;

  return (
    <Component
      {...(level === "link" ? { to } : {})}
      data-aos={dataAos}
      className={`text-${color} ${combinedClassNames}`}
    >
      {children}
    </Component>
  );
};

Text.propTypes = {
  level: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle",
    "body",
    "button",
    "link",
    "overline",
    "caption",
    "captionSmall",
  ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  textStyle: PropTypes.string,
  dataAos: PropTypes.string,
  to: PropTypes.string,
};
