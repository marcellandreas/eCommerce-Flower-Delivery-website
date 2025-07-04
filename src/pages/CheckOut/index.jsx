import { useState } from "react";
import { MdCheck, MdEditSquare, MdLock } from "react-icons/md";
import fresh_1 from "../../assets/images/fresh/1.png";
import { Button, InputText, Text } from "../../components/atoms";
import LoginPopUp from "../../components/molecules/PopUp/LoginPopUp";
import { MainLayout } from "../../components/organisms";
import usePopUp from "../../utils/usePopUp";
import {
  FormContactInformation,
  FormPayment,
  FormShippingDetails,
} from "../../features";

const steps = ["Create an account >", "Verify email >", "Get full access"];
const CheckOut = () => {
  const [active, setActive] = useState(0);

  const {
    showPopUp: showLogin,
    handleOpenPopUp: openLogin,
    handleClosePopUp: closeLogin,
  } = usePopUp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <MainLayout>
      {/* left */}
      <div className="col-span-6 py-10 px-20 flex flex-col gap-10">
        {/* breadscrumb */}
        <div className="flex gap-3 uppercase text-sm font-medium">
          {steps.map((label, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm transition ${
                index === active
                  ? "text-black"
                  : index < active
                  ? " text-lightGray"
                  : " text-lightGray"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Step Content Box (semua step ditampilkan) */}
        <>
          {/* Step 1 */}
          <>
            {active === 0 ? (
              <div className="flex flex-col gap-6">
                {/* info login */}
                <div className="flex flex-col p-10 items-start bg-lightGray">
                  <Text level="body">
                    Already have an account?{" "}
                    <span
                      onClick={openLogin}
                      className=" cursor-pointer underline text-black"
                    >
                      Log in
                    </span>{" "}
                    for faster checkout{" "}
                  </Text>
                </div>
                {/* information */}
                <FormContactInformation
                  formData={formData}
                  steps={steps}
                  active={active}
                  setActive={setActive}
                  handleChange={handleChange}
                />
              </div>
            ) : active > 0 ? (
              <div className="flex justify-between w-full  pb-6 gap-4 border-b border-black ">
                <div className="flex gap-1 items-center">
                  <MdCheck />
                  <Text color="black" level="subtitle">
                    Contact information
                  </Text>
                </div>
                <MdEditSquare size={24} />
              </div>
            ) : (
              <p className="text-gray-500">🔄 Step 1 on progress</p>
            )}
          </>

          {/* Step 2 */}
          <>
            {active === 1 ? (
              <FormShippingDetails
                formData={formData}
                steps={steps}
                active={active}
                setActive={setActive}
                handleChange={handleChange}
              />
            ) : active > 1 ? (
              <div className="flex justify-between w-full  pb-6 gap-4 border-b border-black ">
                <div className="flex gap-1 items-center">
                  <MdCheck />
                  <Text color="black" level="subtitle">
                    Shipping details
                  </Text>
                </div>
                <MdEditSquare size={24} />
              </div>
            ) : (
              <div className="flex pb-6 flex-col gap-4 border-b border-lightGray ">
                <Text color="lightGray">2 Shipping details</Text>
              </div>
            )}
          </>

          {/* Step 3 */}
          <>
            {active === 2 ? (
              <FormPayment />
            ) : (
              <div className="flex pb-6 flex-col gap-4 border-b border-lightGray ">
                <Text color="lightGray">3 Payment</Text>
              </div>
            )}
          </>
        </>
      </div>
      {/* right sections - shopping items */}
      <section className=" bg-extraLight  col-span-6 py-10 px-20 flex flex-col gap-10">
        <Text level="overline">Order summary</Text>

        <div className=" flex flex-col gap-6  border-b border-lightGray ">
          {/* product */}

          <div className="flex pb-6 gap-4">
            <img width={160} height={160} src={fresh_1} alt="Shop Product" />
            {/* product info */}
            <div className="flex justify-between items-center flex-1">
              <div className="flex flex-col gap-2">
                <Text level="subtitle" color="black">
                  Snowfall
                </Text>
                <Text level="body" color="black">
                  Snowfall
                </Text>
              </div>
              <Text level="subtitle">$100</Text>
            </div>
          </div>
          {/* add gift */}
          <div className=" flex flex-col pb-6 gap-4 border-b border-lightGray">
            <Text>
              If you have our gift card, enter the code to get discounts
            </Text>
            {/* button field */}
            <div className="flex gap-4 items-center ">
              <InputText placeholder="Gift card" classNameParent="flex-1" />
              <Button className="flex-1" type="primary">
                Apply
              </Button>
            </div>
          </div>
          {/* sub total */}
          <div className="flex flex-col pb-6 gap-6 border-b border-lightGray">
            <div className="flex justify-between">
              <Text>Subtotal</Text>
              <Text>$100</Text>
            </div>
            <div className="flex justify-between">
              <Text>Shipping</Text>
              <Text>Calculated at next step</Text>
            </div>
          </div>
          {/* total */}
          <div className="flex flex-col justify-between h-auto min-h-[50px] ">
            <div className="flex justify-between">
              <Text>Total</Text>
              <Text>$100</Text>
            </div>
            <div className="flex items-end gap-1 justify-center h-20">
              Secure Checkout
              <MdLock />
            </div>
          </div>
        </div>
      </section>
      <LoginPopUp show={showLogin} onClose={closeLogin} />
    </MainLayout>
  );
};

export default CheckOut;
