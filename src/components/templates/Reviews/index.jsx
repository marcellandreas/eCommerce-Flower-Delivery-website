import Content from "../../molecules/Content";

const Reviews = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 self-stretch">
      <Content>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col justify-center w-full items-center gap-2">
            <p>X</p>
            <p className=" text-mobileOverline md:text-desktopOverline">
              REVIEWS
            </p>
          </div>
          <h2 className=" text-mobileH2 md:text-desktopH2">Our Clients say</h2>
        </div>
      </Content>
    </section>
  );
};

export default Reviews;
