import { CardItem } from "../../components/molecules/Card";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/footer";
import { freshFlowers } from "./dataFreshFlowers";

function ShopProducts() {
  return (
    <section>
      <Navbar />
      <section className=" grid grid-flow-dense grid-cols-12">
        <div className=" col-span-12 lg:col-span-6   border-black flex flex-col items-start h-full lg:sticky top-0 relative">
          {/* row 1 */}
          <div className="flex flex-col gap-4 flex-1 items-center justify-center self-stretch bg-[url(./freshFlower.png)] h-full bg-center bg-cover ">
            <p className=" text-desktopH2 text-white">Fresh Flower</p>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6 grid grid-cols-2 grid-rows-2  ">
          {freshFlowers.slice(0, 2).map((data, i) => (
            <div
              key={i}
              className=" col-span-2 row-span-1  md:col-span-1 md:row-span-1"
            >
              <CardItem
                itemPrice={data.price}
                key={i}
                itemName={data.name}
                itemImg={data.image}
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default ShopProducts;
