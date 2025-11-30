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


