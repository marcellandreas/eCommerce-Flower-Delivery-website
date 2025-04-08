import PropTypes from "prop-types";
import { Text } from "../../atoms";

export const CardCategory = ({ label, children }) => {
  return (
    <section className="relative flex col-span-6 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] p-3 md:p-6 flex-col justify-center items-center border-l border-b border-black">
      <Text level="h3">{label}</Text>
      <p className="absolute bottom-6">{children}</p>
    </section>
  );
};

CardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
