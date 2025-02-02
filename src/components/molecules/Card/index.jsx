import PropTypes from "prop-types";
import { CustomButtonLink } from "../../atoms/Button";
import Text from "../../atoms/Text";

export const CardCategory = ({ label, children }) => {
  return (
    <section className=" relative h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex col-span-6 p-3 md:p-6 flex-shrink-0 flex-col justify-center items-center border-l border-b border-black">
      <Text level="h3">{label}</Text>
      <p className="absolute bottom-6">{children}</p>
    </section>
  );
};

CardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const CardItem = ({ index, itemPrice, itemName, itemImg }) => {
  const isEven = index % 2 === 0;
  return (
    <section
      className={` flex flex-1 flex-shrink-0  h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex-col justify-end items-center overflow-hidden border-l border-b relative  ${
        isEven ? "order-2" : "order-1"
      }`}
    >
      <img
        src={itemImg}
        alt=""
        className="w-full h-full  transform hover:scale-110 transition-transform duration-300"
      />

      <button className="flex absolute left-1/2 bottom-2 transform -translate-x-1/2 hover:scale-90 flex-col justify-center items-center gap-1 self-stretch">
        <Text level="h6">{itemName}</Text>
        <Text level="caption" className="text-gray">
          Rp. {itemPrice}
        </Text>
      </button>
    </section>
  );
};

CardItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemImg: PropTypes.string.isRequired,
};

export const CardBanner = ({
  index,
  label,
  itemImg,
  itemName,
  ItemPrice,
  buttonLink,
  to,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex gap-0 w-full `}>
      <section
        className={`relative flex-1 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex   flex-shrink-0 flex-col justify-center items-center border-l border-b    ${
          isEven ? "order-1" : "order-2"
        }`}
      >
        <Text level="h3">{label}</Text>
        <p className="absolute bottom-6">
          <CustomButtonLink to={to} leftIcon={!isEven} rightIcon={isEven}>
            {buttonLink}
          </CustomButtonLink>
        </p>
      </section>
      <section
        className={` flex flex-1 flex-shrink-0  h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw]  flex-col justify-end items-center overflow-hidden     border-l border-b relative  ${
          isEven ? "order-2" : "order-1"
        }`}
      >
        <img
          src={itemImg}
          alt={itemName}
          className="w-full h-full  transform hover:scale-110 transition-transform duration-300"
        />

        <div className="flex absolute left-1/2 bottom-2 transform -translate-x-1/2 hover:scale-90 flex-col justify-center items-center gap-1 self-stretch">
          <Text level="h6">{itemName}</Text>
          <Text level="caption" className=" self-stretch text-center text-gray">
            {ItemPrice}
          </Text>
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
      <Text level="h3" H3>
        {title}
      </Text>
      <Text className="self-stretch">{content}</Text>
    </div>
  );
};

CardBenefit.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
