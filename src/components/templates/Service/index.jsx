import SERVICE_IMG from "../../../assets/images/ourService.png";
import service2 from "../../../assets/images/section-2.png";
import { Button } from "../../atoms/Button";
import Content from "../../molecules/Content";

const Service = () => {
  return (
    <>
      {/* title */}
      <section className=" flex py-10 px-4 lg:py-20 lg:px-10 justify-start md:justify-center items-center w-full border-b">
        <h2 className=" text-mobileH2 md:text-desktopH2 ">Our Service</h2>
      </section>
      <section className=" flex flex-col lg:flex-row gap-0 ">
        <img
          src={SERVICE_IMG}
          className="flex-1 h-[420px] md:h-[500px] lg:h-[720px] border-b"
          alt="Our Service"
        />
        <div className="border-l border-b">
          <Content>
            <div className="flex flex-col  items-center justify-center gap-16 self-stretch">
              <div className=" flex flex-col justify-center  text-center items-center gap-6 ">
                <p className=" text-mobileOverline md:text-desktopOverline uppercase ">
                  SERVICE
                </p>
                <div className="flex flex-col justify-center items-center gap-4 self-stretch ">
                  <h2 className=" text-mobileH2 md:text-desktopH2">
                    Flower Subcriptions
                  </h2>
                  <p className=" text-mobileSub md:text-desktopSub">
                    Experience the convenience and savings of regular flower
                    deliveries with our flexible subscription service - up to
                    30% more profitable than one-time purchases.
                  </p>
                </div>
              </div>
              <div className=" w-1/2">
                <Button to="/subcribe-now" type={"secondary"}>
                  Subscribe Now
                </Button>
              </div>
            </div>
          </Content>
        </div>
      </section>

      <section
        style={{
          backgroundImage: `url(${service2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
        }}
        className="  h-[420px] text-white md:h-[500px] lg:h-[560px] flex flex-col items-center justify-center"
      >
        <Content>
          <div className="flex flex-col items-center gap-6">
            <p className=" text-mobileOverline md:text-desktopOverline uppercase">
              SERVICE
            </p>
            <div className="flex flex-col items-center gap-4 lg:w-[586px]">
              <h2 className=" text-mobileH2 md:text-desktopH2 text-center">
                Wedding & Event Decor
              </h2>
              <p className=" text-mobileSub md:text-desktopSub text-center">
                Let our team of expert florists and designers create stunning,
                on-trend floral décor for your special day. Trust us to bring
                your vision to life.
              </p>
            </div>
          </div>
          <div className=" w-1/4">
            <Button>Inquire Now</Button>
          </div>
        </Content>
      </section>
    </>
  );
};

export default Service;
