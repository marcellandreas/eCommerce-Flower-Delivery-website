import { memo } from "react";
import PropTypes from "prop-types";
import { Text } from "../atoms";

export const SectionTitle = memo(({ 
  overline, 
  title, 
  description,
  className = "" 
}) => {
  return (
    <div 
      className={`flex flex-col gap-6 items-start ${className}`}
      data-aos="fade-up"
    >
      {overline && <Text level="overline">{overline}</Text>}
      
      <div className="flex flex-col items-start gap-4">
        {title && <Text level="h3">{title}</Text>}
        {description && (
          <Text className="text-justify">{description}</Text>
        )}
      </div>
    </div>
  );
});

SectionTitle.displayName = "SectionTitle";

SectionTitle.propTypes = {
  overline: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};