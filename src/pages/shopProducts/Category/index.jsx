import hero from "../../../assets/images/hero.png";
import itemImg from "../../../assets/images/1.jpg";
import itemImg2 from "../../../assets/images/2.jpg";
import itemImg3 from "../../../assets/images/item3.png";
import itemImg4 from "../../../assets/images/item4.png";
import itemImg5 from "../../../assets/images/item5.png";
import { CardBanner, CardItem } from "../../../components/molecules/Card";
import Navbar from "../../../components/organisms/Navbar";
import Footer from "../../../components/templates/footer";
import { freshFlowers } from "../data";

const Category = () => {
  const data = [
    {
      name: "Fresh Flowers",
      itemImg: itemImg,
    },
    {
      name: "Dried Flowers",
      itemImg: itemImg2,
    },
    {
      name: "Live Plants",
      itemImg: itemImg3,
    },
    {
      name: "Aroma Candes",
      itemImg: itemImg4,
    },
    {
      name: "Freshener",
      itemImg: itemImg5,
    },
  ];
  return (
    <>
      <Navbar />
      <section className="  grid grid-flow-dense grid-cols-12">
        <div className=" col-span-12 lg:col-span-6  border-b border-black flex flex-col items-start h-[50vw] lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0">
          {/* row 1 */}
          <div className="flex flex-col gap-4 flex-1 items-center justify-center self-stretch bg-[url(./freshFlower.png)] h-full bg-center bg-cover ">
            <p className=" text-desktopH2 text-white">Fresh Flower</p>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6 grid grid-cols-2 grid-rows-2  ">
          {freshFlowers.map((data, i) => (
            <div className=" col-span-2 row-span-1  md:col-span-1 md:row-span-1 border">
              <CardItem
                price={data.price}
                key={i}
                item={data.name}
                image={data.image}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Category;
