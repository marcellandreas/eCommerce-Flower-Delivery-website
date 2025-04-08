import PropTypes from "prop-types";
import { CustomButtonLink, Text } from "../../atoms";

export const CardBanner = ({
  index,
  label,
  itemImg,
  itemName,
  itemPrice,
  buttonLink,
  to,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="flex gap-0 w-full">
      <section
        className={`relative flex flex-1 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] flex-col justify-center items-center border-l border-b ${
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
        className={`relative flex flex-1 flex-col justify-end items-center h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] border-l border-b overflow-hidden ${
          isEven ? "order-2" : "order-1"
        }`}
      >
        <img
          src={itemImg}
          alt={itemName}
          className="w-full h-full transform hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 hover:scale-90 flex flex-col items-center gap-1">
          <Text level="h6">{itemName}</Text>
          {itemPrice && (
            <Text level="caption" className="text-gray">
              {`Rp. ${itemPrice}`}
            </Text>
          )}
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
  itemPrice: PropTypes.number,
  buttonLink: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
