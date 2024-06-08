import { Button } from "../../atoms/Button";

const AboutUs = () => {
  return (
    <section className="  grid grid-flow-dense grid-cols-12 ">
      <div className=" h-[60px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 py-10 px-10 md:py-20 md:px-20">
        <h1
          data-aos="fade-up"
          className=" text-black text-mobileH2 md:text-desktopH2 font-semibold"
        >
          About Us
        </h1>
      </div>
      <div className=" lg:col-span-6 col-span-12 flex  py-10 px-10 md:py-20 md:px-20    flex-col items-start gap-16 border-l border-b  ">
        <div className=" flex flex-col gap-6 items-start">
          <p className=" text-mobileOverline md:text-desktopOverline font-medium uppercase">
            our story
          </p>
          <div className=" flex flex-col items-start gap-4">
            <h3 className=" text-mobileH3 md:text-desktopH3 font-medium text-black">
              Kyiv LuxeBouquets
            </h3>
            <p className=" text-black text-mobileBody md:text-desktopBody text-justify">
              We are a modern local floral studio, which specializes in the
              design and delivery of unique bouquets. We have the best florists
              who carefully select each look, our studio cooperates directly
              with farms for growing different flowers, so we always have fresh
              flowers, which are collected by our florists in exquisite
              bouquets. We have a collection of fresh bouquets, collections of
              dried bouquets, house plants, as well as fragrant candles from
              luxury brands to create the perfect atmosphere. Make someone's day
              amazing by sending flowers, plants and gifts the same or next day.
              Ordering flowers online has never been easier.
            </p>
          </div>
        </div>
        <Button to="/about" type={"secondary"}>
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default AboutUs;
