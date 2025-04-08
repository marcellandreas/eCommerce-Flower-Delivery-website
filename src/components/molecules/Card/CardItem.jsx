import PropTypes from "prop-types";
import { Text } from "../../atoms";

export const CardItem = ({ index, itemPrice, itemName, itemImg }) => {
  const isEven = index % 2 === 0;
  return (
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

      <button className="absolute left-1/2 bottom-2 transform -translate-x-1/2 hover:scale-90 flex flex-col items-center gap-1">
        <Text level="h6">{itemName}</Text>
        <Text level="caption" className="text-gray">
          Rp. {itemPrice}
        </Text>
      </button>
    </section>
  );
};

CardItem.propTypes = {
  index: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemImg: PropTypes.string.isRequired,
};
