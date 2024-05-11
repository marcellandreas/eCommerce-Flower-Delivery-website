import PropTypes from "prop-types";

export const CardCategory = ({ label, children }) => {
  return (
    <section className=" relative h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex col-span-6 p-3 md:p-6 flex-shrink-0 flex-col justify-center items-center border-l border-b border-black">
      <label className="flex justify-center items-center self-stretch text-black text-center md:text-desktopH3 text-mobileH3  font-medium ">
        {label}
      </label>
      <p className="absolute bottom-6">{children}</p>
    </section>
  );
};

CardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const CardItem = ({ item, price, image }) => {
  return (
    <section
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center center",
      }}
      className="flex p-3 flex-shrink-0 lg:p-6 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] col-span-6  flex-col justify-end items-center border-l border-b border-black bg-cover"
    >
      <div className="flex flex-col justify-center items-center gap-1 self-stretch">
        <h6 className=" self-stretch text-black text-center text-mobileH6 md:text-desktopH6 capitalize font-medium">
          {item}
        </h6>
        <caption className=" self-stretch text-center text-gray text-mobileCaption md:text-desktopCaption font-medium">
          {price}
        </caption>
      </div>
    </section>
  );
};

CardItem.propTypes = {
  item: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

import { CustomButtonLink } from "../../atoms/Button";

export const CardBanner = ({
  index,
  label,
  itemImg,
  itemName,
  ItemPrice,
  buttonLink,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex gap-0 w-full `}>
      <section
        className={`relative flex-1 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex   flex-shrink-0 flex-col justify-center items-center border-b-black border   ${
          isEven ? "order-1" : "order-2"
        }`}
      >
        <label className="flex justify-center items-center self-stretch text-black text-center md:text-desktopH3 text-mobileH3  font-medium ">
          {label}
        </label>
        <p className="absolute bottom-6">
          <CustomButtonLink leftIcon={!isEven} rightIcon={isEven}>
            {buttonLink}
          </CustomButtonLink>
        </p>
      </section>
      <section
        className={` flex flex-1 flex-shrink-0  h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex-col justify-end items-center overflow-hidden  bg-cover   border-b-black border relative  ${
          isEven ? "order-2" : "order-1"
        }`}
      >
        <img
          src={itemImg}
          alt=""
          className="w-full h-full  transform hover:scale-110 transition-transform duration-300"
        />

        <div className="flex absolute left-1/2 bottom-2 transform -translate-x-1/2 hover:scale-90 flex-col justify-center items-center gap-1 self-stretch">
          <h6 className=" self-stretch text-black text-center text-mobileH6 md:text-desktopH6 capitalize font-medium">
            {itemName}absolutea
          </h6>
          <caption className=" self-stretch text-center text-gray text-mobileCaption md:text-desktopCaption font-medium">
            {ItemPrice}a
          </caption>
        </div>
      </section>
    </div>
  );
};
CardBanner.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  itemImg: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  ItemPrice: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
};

export const CardBenefit = ({ title, content }) => {
  return (
    <div className="flex py-10 px-10 md:py-20 md:px-20  flex-col gap-4 items-start border-l border-b border-black">
      <h3 className=" text-mobileH3 md:text-desktopH3 font-medium text-black">
        {title}
      </h3>
      <p className=" text-black text-mobileBody md:text-desktopBody self-stretch">
        {content}
      </p>
    </div>
  );
};

CardBenefit.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
