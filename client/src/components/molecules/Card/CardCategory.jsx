
import PropTypes from "prop-types";
import { memo } from "react";
import { Text } from "../../atoms";


// CardCategory Component
export const CardCategory = memo(({ label, children }) => {
  return (
    <section className="relative flex col-span-6 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] p-3 md:p-6 flex-col justify-center items-center border-l border-b border-black transition-all duration-300 hover:bg-gray-50">
      <Text level="h3">{label}</Text>
      <div className="absolute bottom-6">{children}</div>
    </section>
  );
});

CardCategory.displayName = "CardCategory";

CardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
