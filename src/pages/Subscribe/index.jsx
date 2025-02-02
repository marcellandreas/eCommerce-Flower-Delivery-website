import React, { useState } from "react";
import Footer from "../../components/organisms/Footer";
import Navbar from "../../components/organisms/Navbar";
import subscriptionImage from "../../assets/images/subscription.png";
import {
  FontTextBody,
  FontTextH2,
  FontTextH3,
  FontTextH4,
  FontTextH6,
  FontTextOverline,
  FontTextSubtitle,
} from "../../components/atoms/Font";
import { CardBenefit } from "../../components/molecules/Card";
import { Button } from "../../components/atoms/Button";
import styles from "./subscribe.module.css";
import { FAQSection } from "../../components/organisms/FAQSection";
import {
  DataPlainCard,
  howItWorksSteps,
  subscriptionOptions,
} from "../../assets/data/Subscribe";

const PlainCard = ({ plain }) => {
  const { title, image, descriptionPoint } = plain;
  return (
    <article className="grid grid-cols-12 border border-lightGray">
      <img src={image} alt={title} className="md:col-span-6 col-span-12" />
      <div className="md:col-span-6 col-span-12 gap-4 p-4 flex flex-col">
        <FontTextSubtitle>{title}</FontTextSubtitle>
        <ul className="list-disc pl-4">
          {descriptionPoint.map((item) => (
            <li key={item.id}>
              <FontTextBody>{item.name}</FontTextBody>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12">
        <Button type="primary">Select</Button>
      </div>
    </article>
  );
};

const Subscription = () => {
  const [deliveryCount, setDeliveryCount] = useState(0);
  const [frequency, setFrequency] = useState("");

  const increment = () => setDeliveryCount((prev) => prev + 1);
  const decrement = () => setDeliveryCount((prev) => (prev > 0 ? prev - 1 : 0));
  const handleFrequencyClick = (value) => setFrequency(value);

  return (
    <>
      <Navbar />
      <main>
        <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-screen border-b">
          <img
            src={subscriptionImage}
            alt="Subscription"
            className="w-full h-full bg-contain"
          />
          <div className="md:p-20 p-10 gap-4 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              <FontTextH2>Flower Subscription</FontTextH2>
              {subscriptionOptions.map((option) => (
                <div key={option.id} className="flex flex-col gap-2">
                  <FontTextH6>{option.title}</FontTextH6>
                  <FontTextBody>{option.desc}</FontTextBody>
                </div>
              ))}
            </div>
            <Button>Explore Plans</Button>
          </div>
        </section>

        <section className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6 flex flex-col items-start justify-start gap-4 py-10 px-10 md:py-20 md:px-20">
            <FontTextH2>How Does It Work?</FontTextH2>
          </div>
          <div className="col-span-12 lg:col-span-6 flex flex-col items-start">
            {howItWorksSteps.map((step) => (
              <CardBenefit
                key={step.id}
                title={step.title}
                content={step.desc}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 border-t">
          <div className="col-span-12 lg:col-span-6 flex flex-col items-start gap-4 py-10 px-10 md:py-20 md:px-20">
            <FontTextOverline>Build Your Subscription</FontTextOverline>
            <div className="flex flex-col gap-4">
              <FontTextH3>Selecting a Plan</FontTextH3>
              <FontTextBody>
                Enjoy free shipping on every order and save up to 30%. Modify or
                cancel anytime from your dashboard.
              </FontTextBody>
            </div>
            {DataPlainCard.map((card) => (
              <PlainCard key={card.id} plain={card} />
            ))}

            <div className="flex flex-col gap-6 w-full">
              <FontTextH4>How often do you want flowers delivered?</FontTextH4>
              <FontTextBody>Select the delivery frequency</FontTextBody>
              <div className="grid grid-cols-3 gap-4">
                {["Monthly", "Bi-Weekly", "Weekly"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleFrequencyClick(option)}
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

            <div className="flex flex-col gap-6 w-full">
              <FontTextH4>How many deliveries would you like?</FontTextH4>
              <FontTextBody>
                Pay once and relax, knowing your bouquets will be beautiful and
                on time.
              </FontTextBody>
              <div className="flex gap-1 w-1/3 p-2">
                <Button className="w-[60px]" onClick={decrement}>
                  -
                </Button>
                <input
                  type="number"
                  className={`border w-[60px] text-center focus:outline-none ${styles.number_input}`}
                  value={deliveryCount}
                  readOnly
                />
                <Button className="w-[60px]" onClick={increment}>
                  +
                </Button>
              </div>
            </div>
            <Button type="primary">Checkout</Button>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col items-start">
            <img
              src={subscriptionImage}
              alt="Subscription"
              className="w-full h-full"
            />
          </div>
        </section>

        <FAQSection />
      </main>
      <Footer />
    </>
  );
};

export default Subscription;
