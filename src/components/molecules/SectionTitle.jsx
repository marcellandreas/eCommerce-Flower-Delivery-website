import PropTypes from "prop-types";
import { Text } from "../atoms";

export const SectionTitle = ({ overline, title, description }) => {
  return (
    <div className="flex flex-col gap-6 items-start">
      <Text level="overline">{overline}</Text>
      <div className="flex flex-col items-start gap-4">
        <Text level="h3">{title}</Text>
        <Text className="text-justify">{description}</Text>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
