import { useState, useCallback, memo, useEffect, useMemo } from "react";
import { MdCheck, MdEditSquare, MdLock } from "react-icons/md";
import { Button, InputText, Text } from "../../components/atoms";
import LoginPopUp from "../../components/molecules/PopUp/LoginPopUp";
import { MainLayout } from "../../components/organisms";
import { usePopUp } from "../../utils/usePopUp";
import { useSelector } from "react-redux";
import { useCartQuery } from "../../queries/cart";
import {
  FormContactInformation,
  FormPayment,
  FormShippingDetails,
} from "../../features";

// Constants
const STEPS = [
  "Create an account >",
  "Verify email >",
  "Get full access",
];

// Breadcrumb Component
const Breadcrumb = memo(({ steps, active, setActive }) => (
  <div className="flex gap-3 uppercase text-sm font-medium flex-wrap">
    {steps.map((label, index) => (
      <button
        key={index}
        onClick={() => setActive(index)}
        disabled={index > active}
        className={`cursor-pointer px-4 py-2 rounded-full text-sm transition-all duration-200 ${index === active
            ? "text-black font-semibold"
            : index < active
              ? "text-gray hover:text-black"
              : "text-lightGray cursor-not-allowed"
          }`}
        aria-current={index === active ? "step" : undefined}
      >
        {label}
      </button>
    ))}
  </div>
));

Breadcrumb.displayName = "Breadcrumb";

// Completed Step Component
const CompletedStep = memo(({ label, onEdit }) => (
  <div className="flex justify-between w-full pb-6 gap-4 border-b border-black">
    <div className="flex gap-2 items-center">
      <MdCheck className="text-success" aria-hidden="true" />
      <Text color="black" level="subtitle">
        {label}
      </Text>
    </div>
    <button
      onClick={onEdit}
      className="hover:scale-110 transition-transform duration-200"
      aria-label={`Edit ${label}`}
    >
      <MdEditSquare size={24} />
    </button>
  </div>
));

CompletedStep.displayName = "CompletedStep";

// Inactive Step Component
const InactiveStep = memo(({ label }) => (
  <div className="flex pb-6 flex-col gap-4 border-b border-lightGray">
    <Text color="lightGray">{label}</Text>
  </div>
));

InactiveStep.displayName = "InactiveStep";

// Product Summary Component
const ProductSummary = memo(({ item }) => (
  <div className="flex pb-6 gap-4 border-b border-lightGray">
    <img
      width={160}
      height={160}
      src={item.product?.image_url || "https://placehold.co/160"}
      alt={item.product?.name}
      className="border object-cover w-[160px] h-[160px]"
      loading="lazy"
    />
    <div className="flex justify-between items-center flex-1">
      <div className="flex flex-col gap-2">
        <Text level="subtitle" color="black">
          {item.product?.name}
        </Text>
        <Text level="body" color="black">
          Quantity ({item.quantity})
        </Text>
      </div>
      <Text level="subtitle" className="font-semibold">
        Rp. {(item.product?.price * item.quantity).toLocaleString('id-ID')}
      </Text>
    </div>
  </div>
));

ProductSummary.displayName = "ProductSummary";

// Gift Card Section
const GiftCardSection = memo(() => {
  const [giftCard, setGiftCard] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = useCallback(() => {
    if (giftCard) {
      setApplied(true);
      // Handle gift card logic
    }
  }, [giftCard]);

  return (
    <div className="flex flex-col pb-6 gap-4 border-b border-lightGray">
      <Text className="text-gray-600">
        If you have our gift card, enter the code to get discounts
      </Text>
      <div className="flex gap-4 items-center">
        <InputText
          placeholder="Gift card"
          classNameParent="flex-1"
          value={giftCard}
          onChange={(e) => setGiftCard(e.target.value)}
          disabled={applied}
        />
        <Button
          className="flex-1"
          type={applied ? "secondary" : "primary"}
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </div>
    </div>
  );
});

GiftCardSection.displayName = "GiftCardSection";

// Main Component
const CheckOut = () => {
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { currentUser } = useSelector((state) => state.user);
  const { data: cartData, isLoading: isCartLoading } = useCartQuery();
  const cartItems = cartData?.data?.items || [];

  const {
    showPopUp: showLogin,
    handleOpenPopUp: openLogin,
    handleClosePopUp: closeLogin,
  } = usePopUp();

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.first_name + " " + currentUser.last_name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
      }));
    }
  }, [currentUser]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  }, [cartItems]);

  return (
    <MainLayout>
      {/* Left Column - Forms */}
      <div className="col-span-12 lg:col-span-6 py-10 px-4 md:px-10 lg:px-20 flex flex-col gap-10">
        {/* Breadcrumb */}
        <Breadcrumb steps={STEPS} active={active} setActive={setActive} />

        {/* Login Info */}
        {active === 0 && !currentUser && (
          <div className="flex flex-col p-6 md:p-10 items-start bg-lightGray rounded-lg">
            <Text level="body">
              Already have an account?{" "}
              <button
                onClick={openLogin}
                className="cursor-pointer underline text-black font-semibold hover:text-gray transition-colors duration-200"
              >
                Log in
              </button>{" "}
              for faster checkout
            </Text>
          </div>
        )}

        {/* Step 1: Contact Information */}
        {active === 0 ? (
          <FormContactInformation
            formData={formData}
            steps={STEPS}
            active={active}
            setActive={setActive}
            handleChange={handleChange}
          />
        ) : active > 0 ? (
          <CompletedStep
            label="Contact information"
            onEdit={() => setActive(0)}
          />
        ) : (
          <InactiveStep label="1. Contact information" />
        )}

        {/* Step 2: Shipping Details */}
        {active === 1 ? (
          <FormShippingDetails
            formData={formData}
            steps={STEPS}
            active={active}
            setActive={setActive}
            handleChange={handleChange}
          />
        ) : active > 1 ? (
          <CompletedStep
            label="Shipping details"
            onEdit={() => setActive(1)}
          />
        ) : (
          <InactiveStep label="2. Shipping details" />
        )}

        {/* Step 3: Payment */}
        {active === 2 ? (
          <FormPayment />
        ) : (
          <InactiveStep label="3. Payment" />
        )}
      </div>

      {/* Right Column - Order Summary */}
      <section className="bg-extraLight col-span-12 lg:col-span-6 py-10 px-4 md:px-10 lg:px-20 flex flex-col gap-10 border-l">
        <Text level="overline">ORDER SUMMARY</Text>

        <div className="flex flex-col gap-6">
          {/* Product List */}
          {isCartLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ProductSummary key={item.id} item={item} />
            ))
          ) : (
            <Text className="text-gray-500 py-4">Your cart is empty.</Text>
          )}

          {/* Gift Card */}
          <GiftCardSection />

          {/* Pricing */}
          <div className="flex flex-col pb-6 gap-6 border-b border-lightGray">
            <div className="flex justify-between">
              <Text>Subtotal</Text>
              <Text>Rp. {subtotal.toLocaleString('id-ID')}</Text>
            </div>
            <div className="flex justify-between">
              <Text>Shipping</Text>
              <Text className="text-gray-600">Calculated at next step</Text>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Text level="h5">Total</Text>
              <Text level="h5" className="font-bold">
                Rp. {subtotal.toLocaleString('id-ID')}
              </Text>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 py-4">
              <MdLock aria-hidden="true" />
              <Text level="caption">Secure Checkout</Text>
            </div>
          </div>
        </div>
      </section>

      <LoginPopUp show={showLogin} onClose={closeLogin} />
    </MainLayout>
  );
};

export default memo(CheckOut);