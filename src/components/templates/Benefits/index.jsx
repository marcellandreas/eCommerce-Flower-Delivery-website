import { dataBenefit } from "../../../assets/data/Benefits";
import { CardBenefit } from "../../molecules/Card";

const Benefits = () => {
  return (
    <section className="grid grid-flow-dense grid-cols-12">
      <div className=" h-[60px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 py-10 px-10 md:py-20 md:px-20 border-t border-black">
        <h2 className=" text-black text-mobileH2 md:text-desktopH2 font-semibold">
          Why choose us ?
        </h2>
      </div>
      <div className=" col-span-12 lg:col-span-6 flex flex-col items-start">
        {dataBenefit.map((data, i) => (
          <CardBenefit key={i} title={data.title} content={data.content} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
{
  /* <div className=" flex flex-1  flex-col items-center border-r border-b border-l border-black">
<h3 className=" text-black w-full text-mobileH3 md:text-desktopH3 flex justify-center items-center py-4 px-[10px] border-t border-b border-black">
  Phone
</h3>
<div className="bg-red-400 w-full flex p-6 flex-col justify-center items-center gap-6 flex-1">
  <p>aaaa</p>
  <p>aaaa</p>
</div>
</div> */
}
