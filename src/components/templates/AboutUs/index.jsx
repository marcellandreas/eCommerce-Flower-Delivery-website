import { Button, Text } from "../../atoms";
import { Layout } from "../../organisms";

const AboutUs = () => {
  return (
    <Layout>
      <div className=" h-[60px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 py-10 px-10 md:py-20 md:px-20">
        <Text level="h2" dataAos="fade-up" color="black">
          About Us
        </Text>
      </div>
      <div className=" lg:col-span-6 col-span-12 flex p-10 md:p-20 flex-col items-start gap-16 border-l border-b">
        <div className=" flex flex-col gap-6 items-start">
          <Text level="overline">our story</Text>
          <div className=" flex flex-col items-start gap-4">
            <Text level="h3">Kyiv LuxeBouquets</Text>
            <Text className="text-justify">
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
            </Text>
          </div>
        </div>
        <Button to="/about" type={"secondary"}>
          Learn More
        </Button>
      </div>
    </Layout>
  );
};

export default AboutUs;
