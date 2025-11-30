import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, InputText, Text } from "../../components/atoms";

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
