import { memo } from "react";
import PropTypes from "prop-types";
import { Text } from "../atoms";

const BASE_CLASSES = "flex py-10 px-10 md:py-20 md:px-20 flex-col gap-4 items-start border-l border-b border-black transition-colors duration-300 hover:bg-gray-50";

export const BenefitBlock = memo(({ title, content, className = "" }) => {
  return (
    <article
      className={`${BASE_CLASSES} ${className}`}
      data-aos="fade-up"
    >
      <Text level="h3" className="transition-colors duration-300">
        {title}
      </Text>
      <Text className="self-stretch text-justify">
        {content}
      </Text>
    </article>
  );
});

BenefitBlock.displayName = "BenefitBlock";

BenefitBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};