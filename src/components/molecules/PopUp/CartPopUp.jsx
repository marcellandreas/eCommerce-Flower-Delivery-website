import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import CartImage from "../../../assets/images/item.png";
import { LinkButton, Text } from "../../atoms";

// Mock cart data - Replace with actual cart state management
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Rosy Delight",
    price: 100,
    quantity: 1,
    image: CartImage,
  },
];

const CartItem = ({ item, onRemove }) => (
  <div className="flex items-center gap-4 py-6 px-4 md:p-10 border-b transition-colors duration-200 hover:bg-gray-50">
    <img
      src={item.image}
      alt={item.name}
      className="border w-40 h-40 object-cover"
      loading="lazy"
    />
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        <Text level="subtitle">{item.name}</Text>
        <Text level="body" className="text-gray-600">
          Quantity ({item.quantity})
        </Text>
        <Text level="subtitle" className="font-semibold">
          ${item.price}
        </Text>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-error hover:text-red-700 transition-colors duration-200 self-start"
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </div>
  </div>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

const CartPopUp = ({ show, onClose }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [giftMessage, setGiftMessage] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleRemoveItem = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleGiftMessageChange = useCallback((e) => {
    setGiftMessage(e.target.value);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div
        className="bg-white absolute right-0 max-h-screen w-full lg:w-1/2 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between h-16 items-center border-b px-6 md:px-10 lg:py-[26px] md:py-4 py-3 bg-white sticky top-0 z-10">
          <Text level="h4" id="cart-title">
            Shopping Cart
          </Text>
          <button
            onClick={onClose}
            className="text-2xl hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
            aria-label="Close shopping cart"
          >
            <IoClose />
          </button>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10">
            <Text level="h5" className="text-gray-500 mb-4">
              Your cart is empty
            </Text>
            <LinkButton to="/shop" type="secondary" onClick={onClose}>
              Start Shopping
            </LinkButton>
          </div>
        ) : (
          <>
            {/* Items List */}
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Subtotal */}
            <div className="flex justify-between items-center py-6 px-4 md:p-10 border-b">
              <Text level="subtitle">Subtotal</Text>
              <Text level="subtitle" className="font-semibold">
                ${subtotal.toFixed(2)}
              </Text>
            </div>

            {/* Gift Message */}
            <div className="flex justify-between items-center py-6 px-4 md:p-10 border-b">
              <textarea
                placeholder="Gift Message..."
                value={giftMessage}
                onChange={handleGiftMessageChange}
                className="h-32 border border-lightGray rounded p-3 focus:border-gray focus:outline-none focus:ring-2 focus:ring-black w-full resize-none transition-all duration-200"
                aria-label="Gift message"
                maxLength={500}
              />
            </div>

            {/* Shipping Info */}
            <div className="flex justify-center items-center text-center w-full py-6 px-4 md:p-10 border-b bg-extraLight">
              <Text level="subtitle" className="text-gray-600">
                Shipping & taxes calculated at checkout. Free standard shipping
                within Kyiv
              </Text>
            </div>

            {/* Checkout Button */}
            <div className="p-5 bg-white sticky bottom-0 shadow-lg">
              <LinkButton to="/check-out" type="primary" onClick={onClose}>
                CHECK OUT
              </LinkButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CartPopUp.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartPopUp;