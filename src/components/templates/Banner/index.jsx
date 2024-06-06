import hero from "../../../assets/images/hero.png";
import { CardBanner } from "../../molecules/Card";
import itemImg from "../../../assets/images/fresh/1.png";
import itemImg2 from "../../../assets/images/item2.png";
import itemImg3 from "../../../assets/images/item3.png";
import itemImg4 from "../../../assets/images/item4.png";
import itemImg5 from "../../../assets/images/item5.png";
import { Categories } from "../../../assets/data/categoryShop";

const Banner = () => {
  const data = [
    {
      name: "Fresh Flowers",
      itemImg: itemImg,
      to: "shop",
    },
    {
      name: "Dried Flowers",
      to: "shop",
      itemImg: itemImg2,
    },
    {
      name: "Live Plants",
      to: "shop",
      itemImg: itemImg3,
    },
    {
      name: "Aroma Candes",
      to: "shop",
      itemImg: itemImg4,
    },
    {
      name: "Freshener",
      to: "shop",
      itemImg: itemImg5,
    },
  ];
  return (
    <section className="  grid grid-flow-dense grid-cols-12">
      <div className=" col-span-12 lg:col-span-6 px-4 py-10 md:p-20 border-b border-black flex flex-col items-start lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0">
        {/* row 1 */}
        <div className="flex flex-col gap-4 flex-1 self-stretch ">
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
