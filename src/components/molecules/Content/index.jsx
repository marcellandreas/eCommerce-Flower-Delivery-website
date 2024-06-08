import PropTypes from "prop-types";

const Content = ({ children }) => {
  return (
    <section className="flex  py-10 px-4 lg:p-20 flex-col overflow-hidden w-full items-center justify-center gap-16">
      {children}
    </section>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
