import { memo } from "react";
import PropTypes from "prop-types";
import AccordionCard from "../molecules/AccordionCard";
import { FAQ } from "../../assets/data/Subscribe";

const FAQSection = memo(() => {
  if (!FAQ || FAQ.length === 0) {
    return (
      <div className="w-3/4 text-center py-10">
        <p className="text-gray-500">No FAQs available at the moment.</p>
      </div>
    );
  }

  return (
    <article className="w-3/4" role="region" aria-label="Frequently Asked Questions">
      {FAQ.map((data, index) => (
        <div key={data.id || index}>
          <AccordionCard
            title={data.title}
            description={data.description}
          />
          {index < FAQ.length - 1 && (
            <hr className="border-t border-lightGray my-10" aria-hidden="true" />
          )}
        </div>
      ))}
    </article>
  );
});

FAQSection.displayName = "FAQSection";

export default FAQSection;