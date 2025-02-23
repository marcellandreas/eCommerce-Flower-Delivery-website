import React, { useState } from "react";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import { Text } from "../atoms";

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
        <Text level="h4">{title}</Text>
        {isOpen ? (
          <LuArrowUpRight className="w-5 h-5 text-black" />
        ) : (
          <LuArrowDownRight className="w-5 h-5 text-black" />
        )}
      </div>
      {/* content / desc */}
      {isOpen && <Text>{description}</Text>}
    </section>
  );
};

export default AccordionCard;
