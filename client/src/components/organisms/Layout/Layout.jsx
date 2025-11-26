import { memo } from "react";
import PropTypes from "prop-types";

const Layout = memo(({ children, className = "" }) => {
  return (
    <article className={`grid grid-flow-dense grid-cols-12 col-span-12 ${className}`}>
      {children}
    </article>
  );
});

Layout.displayName = "Layout";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Layout };