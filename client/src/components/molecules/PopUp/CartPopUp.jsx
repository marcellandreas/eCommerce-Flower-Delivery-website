import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { LinkButton, Text } from "../../atoms";
import { useCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from "../../../queries/cart";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/slices/uiSlice";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div className="flex items-center gap-4 py-6 px-4 md:p-10 border-b transition-colors duration-200 hover:bg-gray-50">
    <img
      src={item.product?.image_url || "https://placehold.co/150"}
      alt={item.product?.name}
      className="border w-20 h-20 md:w-40 md:h-40 object-cover"
      loading="lazy"
    />
    <div className="flex justify-between w-full">
      <div className="flex flex-col gap-2">
        <Text level="subtitle">{item.product?.name}</Text>
        <div className="flex items-center gap-2">
          <Text level="body" className="text-gray-600">
            Quantity:
          </Text>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
            className="w-16 border rounded px-2 py-1 text-center"
          />
        </div>

        <Text level="subtitle" className="font-semibold">
          Rp. {(item.product?.price * item.quantity).toLocaleString('id-ID')}
        </Text>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="text-error hover:text-red-700 transition-colors duration-200 self-start text-sm md:text-base"
        aria-label={`Remove ${item.product?.name} from cart`}
      >
        Remove
      </button>
    </div>
  </div>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      image_url: PropTypes.string
    })
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
};

export const CartPopUp = ({ show, onClose }) => {
  const [giftMessage, setGiftMessage] = useState("");
  const dispatch = useDispatch();

  // Fetch cart data
  const { data: cartData, isLoading } = useCartQuery();
  const removeMutation = useRemoveCartItemMutation();
  const updateMutation = useUpdateCartItemMutation();

  const cartItems = cartData?.data?.items || [];

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  }, [cartItems]);

  const handleRemoveItem = useCallback((itemId) => {
    removeMutation.mutate(itemId, {
      onSuccess: () => {
        dispatch(showToast({ type: 'success', message: 'Item removed from cart' }));
      },
      onError: () => {
        dispatch(showToast({ type: 'error', message: 'Failed to remove item' }));
      }
    });
  }, [removeMutation, dispatch]);

  const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateMutation.mutate({ itemId, data: { quantity: newQuantity } }, {
      onError: () => {
        dispatch(showToast({ type: 'error', message: 'Failed to update quantity' }));
      }
    });
  }, [updateMutation, dispatch]);

  const handleGiftMessageChange = useCallback((e) => {
    setGiftMessage(e.target.value);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors duration-300 ${show ? "bg-black bg-opacity-50" : "bg-black bg-opacity-0 pointer-events-none"
        }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div
        className={`bg-white absolute right-0 top-0 h-screen w-full lg:w-1/2 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between h-16 items-center border-b px-6 md:px-10 lg:py-[26px] md:py-4 py-3 bg-white sticky top-0 z-10">
          <Text level="h4" id="cart-title">
            Shopping Cart ({cartItems.length})
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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cartItems.length === 0 ? (
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
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}

            {/* Subtotal */}
            <div className="flex justify-between items-center py-6 px-4 md:p-10 border-b">
              <Text level="subtitle">Subtotal</Text>
              <Text level="subtitle" className="font-semibold">
                Rp. {subtotal.toLocaleString('id-ID')}
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
