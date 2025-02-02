import Text from "../atoms/Text";
import PropTypes from "prop-types";

export const BenefitBlock = ({ title, content, className }) => {
  return (
    <div
      className={`flex py-10 px-10 md:py-20 md:px-20 flex-col gap-4 items-start border-l border-b border-black ${className}`}
    >
      <Text level="h3">{title}</Text>
      <Text className="self-stretch">{content}</Text>
    </div>
  );
};

BenefitBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
