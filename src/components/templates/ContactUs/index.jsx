import { Button } from "../../atoms/Button";
import { InputText } from "../../atoms/Input";
import itemImg from "../../../assets/images/item.png";
import { FaPhoneAlt } from "react-icons/fa";
import CardMediaSosial from "../../molecules/CardMediaSosial";

const ContactUs = () => {
  return (
    <section className="grid grid-flow-dense grid-cols-12 ">
      {/* left */}
      <div className=" order-2 md:order-1 flex flex-col items-center col-span-12 lg:col-span-6  border-t">
        <div className="min-h-[360px] h-[360px]  border-t-black py-10 px-4 lg:p-20 flex flex-col items-start gap-6">
          <h2 className=" text-black text-mobileH2 md:text-desktopH2 font-semibold">
            Let's Talk
          </h2>
          <div className="flex flex-col items-start gap-4 self-stretch">
            <label className="text-black text-mobileSub md:text-desktopSub font-medium">
              Enter your number and we'll call you back ASAP to help you with
              any questions or to place an order
            </label>
            <div className="flex self-stretch  items-start flex-col md:flex-row gap-4">
              <InputText placeholder="+380 XX XXX XX XX" />
              <Button type="primary">Book A Call</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col border  md:flex-row items-start   h-full w-full">
          <div
            className={`flex text-center  flex-1 w-full flex-col h-full  justify-stretch items-center  `}
          >
            <h4 className=" text-center border-b  border-r w-full   text-mobileH3 md:text-desktopH3 py-4 px-3 ">
              Phone
            </h4>
            <aside className="flex p-6 flex-col border-r justify-center w-full items-center gap-6 flex-1">
              <section className=" flex justify-center items-center gap-2">
                <FaPhoneAlt />
                <p> +380980099111</p>
              </section>
              <section className=" flex justify-center items-center gap-2">
                <FaPhoneAlt />
                <p> +380980099111</p>
              </section>
            </aside>
          </div>

          <div
            className={`flex flex-1 w-full  flex-col h-full  justify-stretch items-center `}
          >
            <h4 className=" text-center border-b w-full   text-mobileH3 md:text-desktopH3 py-4 px-3 ">
              Address
            </h4>
            <aside className="flex p-6 flex-col justify-center  w-full items-center gap-6 flex-1">
              <p> OPENING HOURS: 8 TO 11 P.M.</p>
              <p>15/4 Khreshchatyk Street, Kyiv</p>
            </aside>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="order-1 md:order-2 flex flex-col items-center col-span-12 lg:col-span-6 bg-slate-700 border-t relative h-[500px] md:h-[580px] lg:h-[720px] ">
        <img
          src={itemImg}
          className="w-full h-[500px] md:h-[580px] lg:h-[720px] relative"
          alt=",l,"
        />
        <div className="w-full h-auto  lg:h-[72px] absolute bg-white flex flex-col md:flex-row bottom-0 left-0">
          <h3 className="flex-1 text-mobileH3 md:text-desktopH3 flex items-center justify-between lg:justify-center pt-4 pb-2 px-4 md:pt-4 md:pb-4 md:px-10 md:border-y md:border-l md:border-black">
            Follow Us
          </h3>
          <CardMediaSosial
            className={
              "flex-1  pb-4 px-4 pt-2 md:pt-4 md:pb-4 md:px-10  md:border-y md:border-l md:border-black"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
