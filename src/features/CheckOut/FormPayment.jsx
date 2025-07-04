import { Button, InputText, Text } from "../../components/atoms";

const FormPayment = (active, formData, handleChange, steps, setActive) => {
  return (
    <form className="flex pb-6 flex-col gap-4 border-b border-b-lightGray">
      <Text level="subtitle">3 Payment</Text>
      <InputText
        label="Pay by card. Your payment is secure."
        placeholder="Card Number"
      />
      <div className="flex gap-3">
        <InputText placeholder="MM/YY" />
        <InputText placeholder="CW CODE" />
      </div>
      <Button type="primary">Make A Purchase</Button>
      <div className="flex flex-col gap-3">
        <Text level="h6">Or pay using:</Text>
        <div className="flex gap-3">
          <Button className="flex-1">Apple Pay</Button>
          <Button className="flex-1">Google Pay</Button>
        </div>
      </div>
    </form>
  );
};

export default FormPayment;
