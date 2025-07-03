import { IoClose } from "react-icons/io5";
import CartImage from "../../../assets/images/item.png";
import { Button, LinkButton, Text } from "../../atoms";

const CartPopUp = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white absolute right-0 max-h-screen w-full lg:w-1/2 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between h-16 items-center border-b px-6 md:px-10 lg:py-[26px] md:py-4  py-3">
          <Text level="h4">Shopping Cart</Text>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>
        <div className="flex items-center gap-4 py-6 px-4 md:p-10 border-b">
          <img src={CartImage} alt="" className="border" width={160} />
          <div className="flex justify-between w-full">
            <div>
              <Text level="subtitle">Rosy Delight</Text>
              <Text level="body">Quantity (1)</Text>
              <Text level="subtitle"> $100</Text>
            </div>
            <button>Remove</button>
          </div>
        </div>
        <div className="flex justify-between items-center py-6 px-4 md:p-10 border-b">
          <Text level="subtitle">Subtotal</Text>
          <Text level="subtitle">$100.00</Text>
        </div>
        <div className="flex justify-between items-center py-6 px-4 md:p-10 border-b">
          <textarea
            placeholder="Gift Message..."
            className="h-32 border-none focus:border-none outline-none w-full"
          />
        </div>
        <div className="flex justify-center items-center text-center w-full py-6 px-4 md:p-10 border-b">
          <Text level="subtitle">
            Shipping & taxes calculated at checkout Free standard shipping
            within Kyiv
          </Text>
        </div>
        <div className="p-5">
          <LinkButton to="/check-out" type="primary">
            CHECK OUT
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default CartPopUp;
