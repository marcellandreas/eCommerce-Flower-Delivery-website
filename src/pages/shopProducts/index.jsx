import { CardBanner, CardItem } from "../../components/molecules/Card";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/footer";
import { freshFlowers } from "./dataFreshFlowers";
import { FaAnglesLeft } from "react-icons/fa6";
import useBackMenu from "../../utils/useBackMenu";
import { useParams } from "react-router-dom";
import { Categories } from "../../assets/data/categoryShop";

const ShopProductsPage = () => {
  const handleBack = useBackMenu();

  // Cari kategori berdasarkan nama

  return (
    <>
      <Navbar />
      <section className="  grid grid-flow-dense grid-cols-12">
        <div className=" col-span-12 lg:col-span-6  border-b border-black flex flex-col items-start h-[50vw] lg:max-h-[50vw] lg:min-h-[50vw]  lg:sticky top-0 relative">
          {/* row 1 */}
          <button
            onClick={handleBack}
            className=" absolute top-4 left-4 text-white hover:text-black  bg-black hover:bg-white p-3 rounded-full"
          >
            <FaAnglesLeft size={20} className="" />
          </button>
          <div
            className="flex flex-col gap-4 bg-red-700 flex-1 items-center justify-center self-stretch h-full bg-center bg-cover"
            // style={{ backgroundImage: `url(/)` }}
          >
            <p className="text-desktopH2 text-white">SHOP</p>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6  ">
          {Categories.map((data, i) => (
            <CardBanner
              key={i}
              index={i}
              label={data.name}
              itemImg={data.itemImg}
              to={`/shop/${data.name}`}
              buttonLink={"Shop Now"}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShopProductsPage;
