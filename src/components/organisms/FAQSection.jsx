import React from "react";
import AccordionCard from "../molecules/AccordionCard";
import { FAQ } from "../../assets/data/Subscribe";

const FAQSection = () => {
  return (
    <article className="w-3/4">
      {FAQ.map((data) => {
        return (
          <>
            <AccordionCard
              key={data.id}
              title={data.title}
              description={data.description}
            />
            <hr className="border border-lightGray h-[1px]  my-10" />
          </>
        );
      })}
    </article>
  );
};

export default FAQSection;
