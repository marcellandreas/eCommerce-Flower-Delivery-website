import { InputText } from "../../atoms/Input";
import CONTACT_IMG from "../../../assets/images/contact.png";
import { FaPhoneAlt } from "react-icons/fa";
import CardMediaSosial from "../../molecules/CardMediaSosial";
import Text from "../../atoms/Text";
import { Button } from "../../atoms/Button";
import { Layout } from "../../Layout/Layout";

const ContactUs = () => {
  return (
    <Layout>
      {/* left */}
      <div className=" order-2 md:order-1  flex flex-col items-center col-span-12 lg:col-span-6 ">
        <div className="min-h-[360px] h-[360px] border-t   py-10 px-4 lg:p-20 flex flex-col items-start gap-6">
          <Text level="h2">Let's Talk</Text>
          <div className="flex flex-col items-start gap-4 self-stretch ">
            <label className="text-black text-mobileSub md:text-desktopSub font-medium">
              Enter your number and we'll call you back ASAP to help you with
              any questions or to place an order
            </label>
            <div className="flex gap-x-2 flex-wrap w-full">
              <InputText
                classNameParent="flex-1 h-full "
                placeholder="+380 XX XXX XX XX"
                className="flex-1"
              />
              <Button className="flex-1" type="primary">
                Book A Call
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-b  md:flex-row items-start   h-full w-full">
          <div
            className={`flex text-center flex-1 w-full flex-col h-full justify-stretch items-center border-x   `}
          >
            <Text
              level="h3"
              className=" text-center  w-full border-y py-4 px-3 "
            >
              Phone
            </Text>
            <aside className="flex p-6 flex-col justify-center w-full items-center gap-6 flex-1">
              <section className=" flex justify-center items-center gap-2">
                <FaPhoneAlt />
                <Text> +380980099111</Text>
              </section>
              <section className=" flex justify-center items-center gap-2">
                <FaPhoneAlt />
                <Text> +380980099111</Text>
              </section>
            </aside>
          </div>

          <div
            className={`flex flex-1 w-full  flex-col h-full  justify-stretch items-center `}
          >
            <Text
              level="h3"
              className=" text-center  w-full border-y py-4 px-3 "
            >
              Address
            </Text>
            <aside className="flex p-6 flex-col justify-center  w-full items-center gap-6 flex-1">
              <Text> OPENING HOURS: 8 TO 11 P.M.</Text>
              <Text>15/4 Khreshchatyk Street, Kyiv</Text>
            </aside>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="order-1  md:order-2 flex flex-col items-center col-span-12 lg:col-span-6 bg-slate-700 border-l border-b  relative h-[500px] md:h-[580px] lg:h-[720px] ">
        <img
          src={CONTACT_IMG}
          className="w-full h-[500px] md:h-[580px] lg:h-[720px] relative"
          alt=",l,"
        />
        <div className="w-full h-auto  lg:h-[72px] absolute bg-white flex flex-col md:flex-row bottom-0 left-0 ">
          <Text
            level="h3"
            className="flex-1  flex items-center justify-between lg:justify-center pt-4 pb-2 px-4 md:pt-4 md:pb-4 md:px-10 border-t"
          >
            Follow Us
          </Text>
          <CardMediaSosial
            className={
              "flex-1 border-t border-l  pb-4 px-4 pt-2 md:pt-4 md:pb-4 md:px-10  "
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
