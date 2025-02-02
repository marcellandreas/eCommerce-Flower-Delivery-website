import { dataBenefit } from "../../../assets/data/Benefits";
import Text from "../../atoms/Text";
import { BenefitBlock } from "../../molecules/BenefitBlock";

const Benefits = () => {
  return (
    <section className="grid grid-flow-dense grid-cols-12">
      <div className=" h-[60px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 py-10 px-10 md:py-20 md:px-20 border-t border-black">
        <Text level="h2">Why choose us ?</Text>
      </div>
      <div className=" col-span-12 lg:col-span-6 flex flex-col items-start">
        {dataBenefit.map((data, i) => (
          <BenefitBlock key={i} title={data.title} content={data.content} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
