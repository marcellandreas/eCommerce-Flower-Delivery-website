import { memo } from "react";
import PropTypes from "prop-types";
import { CustomNavLink, Text } from "../../atoms";

export const CardBanner = memo(({
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
      {/* Label Section */}
      <section
        className={`relative flex flex-1 h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] flex-col justify-center items-center border-l border-b transition-all duration-300 hover:bg-gray-50 ${
          isEven ? "order-1" : "order-2"
        }`}
      >
        <Text level="h3">{label}</Text>
        <div className="absolute bottom-6">
          <CustomNavLink to={to} leftIcon={!isEven} rightIcon={isEven}>
            {buttonLink}
          </CustomNavLink>
        </div>
      </section>

      {/* Image Section */}
      <section
        className={`relative flex flex-1 flex-col justify-end items-center h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] border-l border-b overflow-hidden group ${
          isEven ? "order-2" : "order-1"
        }`}
      >
        <img
          src={itemImg}
          alt={itemName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 group-hover:scale-90 transition-transform duration-300 flex flex-col items-center gap-1 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
          <Text level="h6">{itemName}</Text>
          {itemPrice && (
            <Text level="caption" className="text-gray">
              Rp. {itemPrice.toLocaleString('id-ID')}
            </Text>
          )}
        </div>
      </section>
    </div>
  );
});

CardBanner.displayName = "CardBanner";

CardBanner.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  itemImg: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number,
  buttonLink: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};