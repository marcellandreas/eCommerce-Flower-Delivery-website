import SERVICE_IMG from "../../../assets/images/ourService.png";
import service2 from "../../../assets/images/section-2.png";
import { Button, Text } from "../../atoms";
import { Layout } from "../../Layout/Layout";

const Service = () => (
  <Layout>
    {/* Title Section */}
    <section className="col-span-12 content-wrapper">
      <Text level="h2">Our Service</Text>
    </section>

    {/* Flower Subscriptions Section */}
    <section className="col-span-12 flex flex-col lg:flex-row gap-0">
      <img
        src={SERVICE_IMG}
        alt="Our Service"
        className="flex-1 h-[420px] md:h-[500px] lg:h-[720px] border-b"
      />
      <div className="border-l border-b content-wrapper">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <Text level="overline">SERVICE</Text>
            <div className="flex flex-col items-center gap-4">
              <Text level="h2">Flower Subscriptions</Text>
              <Text level="subtitle">
                Experience the convenience and savings of regular flower
                deliveries with our flexible subscription service.
              </Text>
            </div>
          </div>
          <Button to="/subcribe-now" type="secondary" className="w-1/2">
            Subscribe Now
          </Button>
        </div>
      </div>
    </section>

    {/* Wedding & Event Decor Section */}
    <section
      style={{
        backgroundImage: `url(${service2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
      className=" h-[420px] text-white md:h-[500px] lg:h-[560px] flex-center  flex-col "
    >
      <section className="col-span-12 content-wrapper ">
        <div className="flex flex-col items-center gap-6">
          <Text level="overline">SERVICE</Text>
          <div className="flex flex-col items-center gap-4 lg:w-[586px]">
            <Text level="h2" className="text-center">
              Wedding & Event Decor
            </Text>
            <Text level="subtitle" className="text-center">
              Let our team of expert florists and designers create stunning,
              on-trend floral décor for your special day.
            </Text>
          </div>
        </div>
        <Button className="w-1/4">Inquire Now</Button>
      </section>
    </section>
  </Layout>
);

export default Service;
