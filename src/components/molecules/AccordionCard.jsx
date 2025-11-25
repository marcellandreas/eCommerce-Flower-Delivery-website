import { useState, memo } from "react";
import PropTypes from "prop-types";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import { Text } from "../atoms";

const AccordionCard = memo(({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <section className="max-w-[75%] m-auto">
      {/* Header */}
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center cursor-pointer w-full hover:opacity-80 transition-opacity duration-200"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <Text level="h4">{title}</Text>
        {isOpen ? (
          <LuArrowUpRight 
            className="w-5 h-5 text-black transition-transform duration-300" 
            aria-hidden="true"
          />
        ) : (
          <LuArrowDownRight 
            className="w-5 h-5 text-black transition-transform duration-300" 
            aria-hidden="true"
          />
        )}
      </button>

      {/* Content */}
      <div
        id={`accordion-content-${title}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <Text>{description}</Text>
      </div>
    </section>
  );
});

AccordionCard.displayName = "AccordionCard";

AccordionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AccordionCard;