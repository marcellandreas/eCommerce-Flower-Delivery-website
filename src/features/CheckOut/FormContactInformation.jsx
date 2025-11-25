import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, InputText, Text } from "../../components/atoms";

export const FormContactInformation = memo(({
  active,
  formData,
  handleChange,
  steps,
  setActive,
}) => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    // Save to localStorage
    try {
      localStorage.setItem("checkoutData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }

    // Move to next step
    setActive((prev) => Math.min(prev + 1, steps.length - 1));
  }, [formData, steps.length, setActive]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex pb-6 flex-col gap-4 border-b border-lightGray"
    >
      <Text level="subtitle" className="font-semibold">
        1. Contact Information
      </Text>

      <InputText
        placeholder="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        label="Full Name"
      />

      <InputText
        placeholder="your.email@example.com"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        label="Email Address"
      />

      <InputText
        placeholder="+62 xxx xxxx xxxx"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
        label="Phone Number"
      />

      <Button
        type="primary"
        disabled={active === steps.length - 1}
      >
        CONTINUE TO SHIPPING
      </Button>
    </form>
  );
});

FormContactInformation.displayName = "FormContactInformation";

FormContactInformation.propTypes = {
  active: PropTypes.number.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActive: PropTypes.func.isRequired,
};

// FormShippingDetails Component
export const FormShippingDetails = memo(({
  active,
  formData,
  handleChange,
  steps,
  setActive,
}) => {
  const handleShipping = useCallback((e) => {
    e.preventDefault();

    // Move to next step
    setActive((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length, setActive]);

  return (
    <form
      onSubmit={handleShipping}
      className="flex flex-col gap-4 pb-6 border-b border-b-lightGray"
    >
      <Text level="subtitle" className="font-semibold">
        2. Shipping Details
      </Text>

      <div className="flex flex-col gap-3">
        <InputText
          placeholder="Recipient's Name"
          name="recipientName"
          required
          label="Recipient's Name"
        />

        <InputText
          type="tel"
          placeholder="+62 xxx xxxx xxxx"
          name="recipientPhone"
          required
          label="Recipient's Phone Number"
        />

        <InputText
          type="date"
          name="deliveryDate"
          required
          label="Delivery Date"
        />

        <InputText
          placeholder="e.g., Morning (9AM-12PM)"
          name="deliveryTime"
          required
          label="Delivery Time"
        />

        <div className="flex gap-3 flex-col md:flex-row">
          <InputText
            classNameParent="flex-1"
            placeholder="Street Address"
            name="street"
            required
            label="Street"
          />
          <InputText
            classNameParent="flex-1"
            placeholder="Apt, Suite, etc."
            name="apartment"
            label="Apartment Number"
          />
        </div>
      </div>

      <Button
        type="primary"
        disabled={active === steps.length - 1}
      >
        CONTINUE TO PAYMENT
      </Button>
    </form>
  );
});

FormShippingDetails.displayName = "FormShippingDetails";

FormShippingDetails.propTypes = {
  active: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActive: PropTypes.func.isRequired,
};

// FormPayment Component
export const FormPayment = memo(({ onSubmit }) => {
  const handlePayment = useCallback((e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  }, [onSubmit]);

  return (
    <form
      onSubmit={handlePayment}
      className="flex pb-6 flex-col gap-4 border-b border-b-lightGray"
    >
      <Text level="subtitle" className="font-semibold">
        3. Payment
      </Text>

      <InputText
        label="Pay by card. Your payment is secure."
        placeholder="Card Number"
        name="cardNumber"
        type="text"
        required
        classInput="tracking-wider"
      />

      <div className="flex gap-3">
        <InputText
          placeholder="MM/YY"
          name="expiry"
          required
          classNameParent="flex-1"
          label="Expiry Date"
        />
        <InputText
          placeholder="CVV"
          name="cvv"
          type="password"
          maxLength="3"
          required
          classNameParent="flex-1"
          label="CVV Code"
        />
      </div>

      <Button type="primary">MAKE A PURCHASE</Button>

      <div className="flex flex-col gap-3 mt-4">
        <Text level="h6">Or pay using:</Text>
        <div className="flex gap-3">
          <Button className="flex-1" type="secondary">
            Apple Pay
          </Button>
          <Button className="flex-1" type="secondary">
            Google Pay
          </Button>
        </div>
      </div>
    </form>
  );
});

FormPayment.displayName = "FormPayment";

FormPayment.propTypes = {
  onSubmit: PropTypes.func,
};