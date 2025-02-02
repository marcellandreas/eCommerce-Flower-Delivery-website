import React, { useState } from "react";
import Footer from "../../components/organisms/footer";
import Navbar from "../../components/organisms/Navbar";
import subscriptionImage from "../../assets/images/subscription.png";
import { CardBenefit } from "../../components/molecules/Card";
import { Button } from "../../components/atoms/Button";
import subscss from "./subscribe.module.css";
import { FAQSection } from "../../components/organisms/FAQSection";
import {
  DataPlainCard,
  howItWorksSteps,
  subscriptionOptions,
} from "../../assets/data/Subscribe";
import Text from "../../components/atoms/Text";

const PlainCard = ({ plain }) => {
  const { title, image, descriptionPoint } = plain;
  return (
    <section className="grid grid-cols-12 border border-lightGray">
      <img src={image} alt={title} className=" md:col-span-6 col-span-12" />
      <div className=" md:col-span-6 col-span-12 gap-4 p-4 flex flex-col">
        <Text level="subtitle" className="">
          {title}
        </Text>
        <ul className="list-disc pl-4">
          {descriptionPoint.map((data) => (
            <li key={data.id}>
              <Text>{data.name}</Text>
            </li>
          ))}
        </ul>
      </div>
      <div className=" col-span-12">
        <Button type="primary">select</Button>
      </div>
    </section>
  );
};

const Subcription = () => {
  const [number, setNumber] = useState(0);

  const increment = () => setNumber((prev) => prev + 1);
  const decrement = () => setNumber((prev) => (prev > 0 ? prev - 1 : 0));

  const [frequency, setFrequency] = useState("");

  const handleClick = (value) => {
    setFrequency(value);
  };
  return (
    <>
      <Navbar />
      <section className=" w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen border-b  ">
        <img
          src={subscriptionImage}
          alt="subscription"
          className="w-full h-full bg-contain"
        />
        <section className="md:p-20 p-10 gap-4 flex flex-col  self-stretch justify-between">
          <div className="flex flex-col gap-8">
            <Text level="h2">Flower Subscription</Text>
            <div className="flex flex-col gap-8 ">
              <div className="flex flex-col gap-6">
                {subscriptionOptions.map((data) => (
                  <div className="flex gap-2 flex-col" key={data.id}>
                    <Text level="h6">{data.title}</Text>
                    <Text>{data.desc}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" w-2/5">
            <Button>Explore Plans</Button>
          </div>
        </section>
      </section>
      <section className="grid grid-flow-dense grid-cols-12">
        <div className=" h-[60px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 p-10 md:p-20">
          <Text level="h2">How does it work?</Text>
        </div>
        <div className=" col-span-12 lg:col-span-6 flex flex-col items-start">
          {howItWorksSteps.map((data, i) => (
            <CardBenefit key={i} title={data.title} content={data.desc} />
          ))}
        </div>
      </section>
      <section className="grid grid-flow-dense grid-cols-12 border-t">
        <div className=" col-span-12 lg:col-span-6  flex flex-col items-start justify-start gap-4 p-10 md:p-20 border-r  ">
          {/* md:order-1 order-2 */}
          <Text level="overline" className="pb-6">
            Build Your Subscription
          </Text>
          {/* main info */}
          <div className="flex flex-col gap-4 ">
            <Text level="h3">Selecting a Plan</Text>
            <Text>
              Enjoy free shipping on every order and save up to 30%. Every
              bouquet we deliver is carefully curated to ensure it arrives fresh
              and stunning. To modify, pause, or cancel your subscription,
              simply log in to your account dashboard. You're in complete
              control of your flower delivery experience.
            </Text>
          </div>
          {/* plain cards */}
          {DataPlainCard.map((data) => (
            <PlainCard key={data.id} plain={data} />
          ))}
          <hr className="border border-lightGray h-[1px] w-full my-10" />

          {/* often */}
          <div className="flex flex-col gap-6 w-full ">
            <div className="flex flex-col gap-4">
              <Text level="h4">How often do you want flowers delivered ?</Text>
              <Text>Select the delivery frequency</Text>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["Monthly", "Bi-Weekly", "Weekly"].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleClick(option)}
                  className={`${
                    frequency === option
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } py-2 rounded-lg`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <hr className="border border-lightGray h-[1px] w-full my-10" />
          {/* many */}
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-4">
              <Text level="h4">How many deliveries would you like ?</Text>
              <Text>
                Pay once and do not worry about flowers, our bouquets will be
                beautiful and on time, as many times as you need{" "}
              </Text>
            </div>
            <div className="flex gap-1  w-1/3 p-2 ">
              <Button className="w-[60px]" onClick={decrement}>
                -
              </Button>
              <input
                type="number"
                className={`border w-[60px] max-h-[48px] min-h-[48px] md:max-h-[56px] md:min-h-[56px] text-black text-mobileBody md:text-desktopBody text-center  focus:outline-none ${subscss.number_input}`}
                value={number}
                readOnly
                onChange={(e) => setNumber(Number(e.target.value))}
              />
              <Button className="w-[60px]" onClick={increment}>
                +
              </Button>
            </div>
          </div>
          <hr className="border border-lightGray h-[1px] w-full my-10" />
          <Button type="primary">Checkout</Button>
        </div>

        <div className=" lg:h-[360px]  lg:top-0 lg:sticky col-span-12 lg:col-span-6 flex flex-col items-start justify-start ">
          <img src={subscriptionImage} alt="" className="w-full h-full" />
        </div>
      </section>
      <section className="p-10 md:p-20 border-t ">
        <div className="p10 md:p-20 flex flex-col gap-10 border border-white justify-center items-center ">
          <Text level="h2">Subscription FAQ</Text>
          <FAQSection />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Subcription;
