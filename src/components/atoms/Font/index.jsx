/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

// Base Text Component
const BaseText = ({ as: Component, className, children, color, textStyle }) => (
  <Component className={`text-${color} ${textStyle} ${className}`}>
    {children}
  </Component>
);

export const FontTextH1 = (props) => (
  <BaseText
    {...props}
    as="h1"
    textStyle="text-mobileH1 md:text-desktopH1 font-bold"
  />
);

export const FontTextH2 = (props) => (
  <BaseText
    {...props}
    as="h2"
    textStyle="text-mobileH2 md:text-desktopH2 font-semibold"
  />
);

export const FontTextH3 = (props) => (
  <BaseText
    {...props}
    as="h3"
    textStyle="text-mobileH3 md:text-desktopH3 font-semibold"
  />
);

export const FontTextH4 = (props) => (
  <BaseText
    {...props}
    as="h4"
    textStyle="text-mobileH4 md:text-desktopH4 font-semibold"
  />
);

export const FontTextH5 = (props) => (
  <BaseText
    {...props}
    as="h5"
    textStyle="text-mobileH5 md:text-desktopH5 font-medium"
  />
);

export const FontTextH6 = (props) => (
  <BaseText
    {...props}
    as="h6"
    textStyle="text-mobileH6 md:text-desktopH6 capitalize font-medium"
  />
);

export const FontTextSubtitle = (props) => (
  <BaseText
    {...props}
    as="p"
    textStyle="text-mobileSub md:text-desktopSub font-normal"
  />
);

export const FontTextBody = (props) => (
  <BaseText
    {...props}
    as="p"
    textStyle="text-mobileBody md:text-desktopBody font-normal"
  />
);

export const FontTextButton = (props) => (
  <BaseText
    {...props}
    as="p"
    textStyle="text-mobileButton uppercase md:text-desktopB font-normal"
  />
);

export const FontTextLink = ({ className, children, color, to }) => (
  <Link
    to={to}
    className={`text-${color} text-mobileLinks md:text-desktopLinks font-medium ${className}`}
  >
    {children}
  </Link>
);

export const FontTextOverline = (props) => (
  <BaseText
    {...props}
    as="span"
    textStyle="text-mobileOverline md:text-desktopOverline uppercase font-medium"
  />
);

export const FontTextCaption = (props) => (
  <BaseText
    {...props}
    as="caption"
    textStyle="text-mobileCaption md:text-desktopCaption font-normal"
  />
);

export const FontTextCaptionSmall = (props) => (
  <BaseText
    {...props}
    as="caption"
    textStyle="text-mobileCaptionSmall md:text-desktopCaptionSmall font-medium"
  />
);
