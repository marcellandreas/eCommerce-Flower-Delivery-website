import PropTypes from "prop-types";
import { memo } from "react";
import { Text } from "../../atoms";

export const CardItem = memo(({ index, itemPrice, itemName, itemImg, onAddToCart }) => {
  const isEven = index % 2 === 0;

  return (
    <section
      className={`relative flex flex-1 flex-col justify-end items-center h-[200px] md:h-[384px] lg:min-h-[25vw] lg:max-h-[25vw] border-l border-b overflow-hidden group cursor-pointer ${isEven ? "order-2" : "order-1"
        }`}
    >
      <img
        src={itemImg}
        alt={itemName}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />

      <div
        className="absolute left-1/2 bottom-2 transform -translate-x-1/2 group-hover:scale-90 transition-transform duration-300 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg min-w-[150px]"
      >
        <div className="flex flex-col items-center gap-1">
          <Text level="h6">{itemName}</Text>
          <Text level="caption" className="text-gray">
            Rp. {itemPrice.toLocaleString('id-ID')}
          </Text>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart && onAddToCart();
          }}
          className="bg-black text-white px-4 py-1.5 rounded-full text-xs hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 w-full"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
});

CardItem.displayName = "CardItem";

CardItem.propTypes = {
  index: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
  itemImg: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func,
};