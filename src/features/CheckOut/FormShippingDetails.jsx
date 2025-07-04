import React from "react";
import { Button, InputText, Text } from "../../components/atoms";

const FormShippingDetails = ({
  active,
  formData,
  handleChange,
  steps,
  setActive,
}) => {
  const handleShipping = (e) => {
    e.preventDefault();
    setActive((prev) => Math.min(prev + 1, steps.length - 1));
  };
  return (
    <form
      onSubmit={handleShipping}
      className="flex flex-col gap-4 pb-6 border-b border-b-lightGray"
    >
      <Text level="subtitle">2 Shipping details</Text>
      <div className="flex flex-col gap-3">
        <InputText placeholder="Recipients Name" />
        <InputText type="Number" placeholder="Recipients Phone number *" />
        <InputText type="date" placeholder="Recipients Phone number *" />
        <InputText placeholder="Delivery Time*" />
        <div className="flex gap-3">
          <InputText classNameParent="input" placeholder="Street " />
          <InputText classNameParent="input" placeholder="Apartment Number" />
        </div>
      </div>
      <Button
        type="primary"
        disabled={() => {
          active === steps.length - 1;
        }}
      >
        Continue to Payment
      </Button>
    </form>
  );
};

export default FormShippingDetails;
