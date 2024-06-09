import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/footer";
import CardMediaSosial from "../../components/molecules/CardMediaSosial";
import ABOUT_IMG from "../../assets/images/about/about.png";
import { dataAbout } from "../../assets/data/dataAbout";
import { Button } from "../../components/atoms/Button";

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <section className=" w-full grid grid-cols-1 md:grid-cols-2  ">
        <div className="flex flex-col col-span-1 justify-center  min-h-[560px] border-r  md:p-20 p-10 gap-16">
          <div className="gap-6 flex flex-col justify-center items-center ">
            <div className="flex justify-center items-center  flex-col gap-6">
              <h2 className=" text-mobileH2 md:text-desktopH2 ">Our Story</h2>
              <p>About</p>
              <h2 className=" text-mobileH2 md:text-desktopH2 ">
                Kyiv LuxeBouquets
              </h2>
            </div>
            <p className=" text-center">
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
          <p className=" md:text-desktopOverline text-mobileOverline uppercase">
            Our story
          </p>
          <h3 className=" text-mobileH3  md:text-desktopH3">
            {`Our Founder's Passion`}{" "}
          </h3>
        </div>
        <p className=" text-mobileBody md:text-desktopBody text-center md:w-2/4 w-full">
          Kyiv LuxeBouquets was founded in 2010 by Natalia Zelinska with the
          goal of bringing unique and exquisite bouquets to the people of Kyiv.
          Natalia has always had a passion for flowers and design, and his
          vision was to create a local floral studio that would specialize in
          the creation and delivery of fresh, beautiful, and distinctive
          bouquets.
        </p>
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
              className={`flex flex-col col-span-1 min-h-[560px] border-r md:p-20 p-10 gap-4 border-l border-b ${
                i % 2 === 0 ? " md:order-2 " : " md:order-1"
              }`}
            >
              <h3 className="text-mobileH3 md:text-desktopH3">
                {i + 1}
                {"."} {data.title}
              </h3>
              <p className="text-mobileBody md:text-desktopBody text-justify">
                {data.content}
              </p>
            </div>
          </section>
        );
      })}

      <section className="md:p-20 p-10 gap-4 flex flex-col justify-center items-center self-stretch  ">
        <div className="flex gap-4 flex-col justify-center items-center">
          <h2 className=" text-mobileH2 md:text-desktopH2 ">
            Discover Our Beautiful Bouquets
          </h2>
          <p className="text-mobileBody md:text-desktopBody w-3/5 text-center">
            Explore our collection of exquisite bouquets and surprise your loved
            ones with the perfect gift. Click the button below to start shopping
          </p>
        </div>
        <div className=" w-1/5 pt-10">
          <Button>SHOP NOW</Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
