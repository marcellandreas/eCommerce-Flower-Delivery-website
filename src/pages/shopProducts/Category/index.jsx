import { Navigate, useNavigate } from "react-router-dom";
import { CardItem } from "../../../components/molecules/Card";
import Navbar from "../../../components/organisms/Navbar";
import Footer from "../../../components/organisms/footer";
import { freshFlowers } from "../data";
import { FaAnglesLeft } from "react-icons/fa6";

const Category = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
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
          <div className="flex flex-col gap-4 flex-1 items-center justify-center self-stretch bg-[url(./freshFlower.png)] h-full bg-center bg-cover ">
            <p className=" text-desktopH2 text-white">Fresh Flower</p>
          </div>
        </div>
        <div className=" col-span-12 lg:col-span-6 grid grid-cols-2 grid-rows-2  ">
          {freshFlowers.map((data, i) => (
            <div className=" col-span-2 row-span-1  md:col-span-1 md:row-span-1">
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
    </>
  );
};

export default Category;
