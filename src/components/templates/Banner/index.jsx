import hero from "../../../assets/images/hero.png";
import { CardBanner } from "../../molecules/Card";
import { Categories } from "../../../assets/data/categoryShop";

const Banner = () => {
  return (
    <section className="  grid grid-flow-dense grid-cols-12">
      <div className=" col-span-12 lg:col-span-6 px-4 py-10 md:p-20 border-b border-black flex flex-col items-start lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0">
        {/* row 1 */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-4 flex-1 self-stretch "
        >
          <h1 className=" text-black text-mobileH1 md:text-desktopH1 font-semibold">
            Kyiv LuxeBouquets
            <span className=" text-black text-mobileH3 md:text-desktopH3  font-medium">
              ®
            </span>
          </h1>
          <p className=" text-mobileSub md:text-desktopSub self-stretch">
            Discover Uniquely Crafted Bouquets and Gifts for Any Occasion:
            Spread Joy with Our Online Flower Delivery Service
          </p>
        </div>
        {/* row 2 */}

        <div className="flex pt-6 justify-end items-end flex-1 self-stretch border-t border-black">
          {/* 1 */}
          <div className=" flex pr-6 items-start flex-1 self-stretch border-r border-black">
            <img src={hero} className="w-full h-full" alt="" />
          </div>
          {/* 2 */}
          <div className=" flex pl-6 items-end flex-1 self-stretch  text-justify">
            <caption className=" text-black text-desktopCaption font-normal">
              Experience the joy of giving with our modern floral studio. Order
              online and send fresh flowers, plants and gifts today.
            </caption>
          </div>
        </div>
      </div>
      <div className=" col-span-12 lg:col-span-6  ">
        {Categories.map((data, i) => (
          <CardBanner
            key={i}
            index={i}
            label={data.name}
            itemImg={data.itemImg}
            to={data.to}
            // itemName={"nama"}
            // ItemPrice={""}
            buttonLink={"Shop Now"}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
