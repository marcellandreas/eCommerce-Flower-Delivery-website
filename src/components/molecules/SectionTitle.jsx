import { Heading, Paragraph } from "../../atoms/Typography";
import PropTypes from "prop-types";
import { FontTextOverline } from "../atoms/Font";

const SectionTitle = ({ overline, title, description }) => {
  return (
    <div className="flex flex-col gap-6 items-start">
      <FontTextOverline className="text-mobileOverline md:text-desktopOverline font-medium uppercase">
        {overline}
      </FontTextOverline>
      <div className="flex flex-col items-start gap-4">
        <Heading
          level="h3"
          className="text-mobileH3 md:text-desktopH3 font-medium"
        >
          {title}
        </Heading>
        <Paragraph className="text-mobileBody md:text-desktopBody text-justify">
          {description}
        </Paragraph>
      </div>
    </div>
  );
};

export default SectionTitle;

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
