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