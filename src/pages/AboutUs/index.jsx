import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/footer";
import CardMediaSosial from "../../components/molecules/CardMediaSosial";
import ABOUT_IMG from "../../assets/images/about/about.png";
import { dataAbout } from "../../assets/data/dataAbout";
import { Button } from "../../components/atoms/Button";
import { FaAnglesLeft } from "react-icons/fa6";
import useBackMenu from "../../utils/useBackMenu";
import {
  FontTextBody,
  FontTextH2,
  FontTextH3,
  FontTextOverline,
} from "../../components/atoms/Font";

const AboutUsPage = () => {
  const handleBack = useBackMenu();
  return (
    <>
      <Navbar />
      <section className=" w-full grid grid-cols-1 lg:grid-cols-2  ">
        <div className="flex flex-col col-span-1 justify-center  min-h-[343px] lg:min-h-[560px] border-r  md:p-20 p-10 gap-16 relative">
          <button
            onClick={handleBack}
            className=" absolute top-4 left-4 text-white hover:text-black  bg-black hover:bg-white p-3 rounded-full"
          >
            <FaAnglesLeft size={20} className="" />
          </button>
          <div className="gap-6 flex flex-col justify-center items-center ">
            <div className="flex justify-center items-center  flex-col gap-6">
              <FontTextH2>Our Story</FontTextH2>
              <p>About</p>
              <FontTextH2>Kyiv LuxeBouquets</FontTextH2>
            </div>
            <p className=" text-center italic">
              Discover Uniquely Crafted Bouquets and Gifts for Any Occasion:
              Spread Joy with Our Online Flower Delivery Service
            </p>
          </div>
          <div className=" bg-white">
            <CardMediaSosial />
          </div>
        </div>

        <div className=" col-span-1">
          <img
            src={ABOUT_IMG}
            alt="about image"
            className=" h-full w-full bg-cover bg-center"
          />
        </div>
      </section>
      <section className=" md:p-20 p-10 gap-4 flex justify-center items-center flex-col border-y">
        <div className=" flex flex-col items-center gap-6">
          <FontTextOverline>Our story</FontTextOverline>
          <FontTextH3>{`Our Founder's Passion`}</FontTextH3>
        </div>
        <FontTextBody className="  text-center md:w-2/4 w-full">
          Kyiv LuxeBouquets was founded in 2010 by Natalia Zelinska with the
          goal of bringing unique and exquisite bouquets to the people of Kyiv.
          Natalia has always had a passion for flowers and design, and his
          vision was to create a local floral studio that would specialize in
          the creation and delivery of fresh, beautiful, and distinctive
          bouquets.
        </FontTextBody>
      </section>
      {dataAbout.map((data, i) => {
        return (
          <section key={i} className="w-full grid grid-cols-1 md:grid-cols-2 ">
            <div
              className={`col-span-1 ${
                i % 2 === 0 ? " md:order-1 " : " md:order-2"
              }`}
            >
              <img className="w-full h-full" src={data.image} alt="" />
            </div>
            <div
              className={`flex flex-col col-span-1 min-h-[343px] lg:min-h-[560px] border-r md:p-20 p-10 gap-4 border-l border-b ${
                i % 2 === 0 ? " md:order-2 " : " md:order-1"
              }`}
            >
              <FontTextH3>{data.title}</FontTextH3>
              <FontTextBody className=" self-stretch">
                {data.content}
              </FontTextBody>
            </div>
          </section>
        );
      })}

      <section className="md:p-20 p-10 gap-4 flex flex-col justify-center items-center self-stretch  ">
        <div className="flex gap-4 flex-col justify-center items-center">
          <FontTextH2>Discover Our Beautiful Bouquets</FontTextH2>
          <FontTextBody className=" w-full  lg:w-3/5 text-center">
            Explore our collection of exquisite bouquets and surprise your loved
            ones with the perfect gift. Click the button below to start shopping
          </FontTextBody>
        </div>
        <div className=" w-full lg:w-1/5 pt-10">
          <Button>SHOP NOW</Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
