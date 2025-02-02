import React, { useState } from "react";
import { FontTextBody, FontTextH4 } from "../atoms/Font";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

const AccordionCard = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);
  return (
    <section className=" max-w-[75%] m-auto">
      {/* header */}
      <div
        onClick={toggleAccordion}
        className="flex justify-between items-center cursor-pointer"
      >
        <FontTextH4>{title}</FontTextH4>
        {isOpen ? (
          <LuArrowUpRight className="w-5 h-5 text-black" />
        ) : (
          <LuArrowDownRight className="w-5 h-5 text-black" />
        )}
      </div>
      {/* content / desc */}
      {isOpen && <FontTextBody>{description}</FontTextBody>}
    </section>
  );
};

export default AccordionCard;
