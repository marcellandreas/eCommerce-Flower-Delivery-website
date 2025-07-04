import { Button, InputText, Text } from "../../components/atoms";

const FormContactInformation = ({
  active,

  formData,
  handleChange,
  steps,
  setActive,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("checkoutData", JSON.stringify(formData));

    setActive((prev) => Math.min(prev + 1, steps.length - 1));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex pb-6 flex-col gap-4 border-b border-lightGray"
    >
      <Text level="subtitle">1 Contact information</Text>
      <InputText
        placeholder="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputText
        placeholder="Your Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputText
        placeholder="Your Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button
        type="primary"
        disabled={() => {
          active === steps.length - 1;
        }}
      >
        CHECK OUT
      </Button>
    </form>
  );
};

export default FormContactInformation;
