import React from "react";
import Navbar from "../../components/organisms/Navbar";
import Footer from "../../components/organisms/footer";
import CardMediaSosial from "../../components/molecules/CardMediaSosial";

const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <section className=" w-full grid grid-cols-1 md:grid-cols-2  ">
        <div className="flex flex-col col-span-1 justify-center  min-h-[560px] border-r  p-20 gap-16">
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
      </section>
      <Footer />
    </>
  );
};

export default AboutUsPage;
