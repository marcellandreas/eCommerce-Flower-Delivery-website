const Text = ({ level = "body", className, children, color, textStyle }) => {
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

  const Component = level || "p";
  const textStyleClass = levels[level] || "";

  const combinedClassNames = `${textStyleClass} ${textStyle || ""} ${
    className || ""
  }`;

  return (
    <Component className={`text-${color} ${combinedClassNames}`}>
      {children}
    </Component>
  );
};

export default Text;
