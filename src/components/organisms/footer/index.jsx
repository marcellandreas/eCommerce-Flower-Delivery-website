import { Button } from "../../atoms/Button";
import CardMediaSosial from "../../molecules/CardMediaSosial";
import {
  FontTextBody,
  FontTextCaption,
  FontTextH5,
  FontTextLink,
} from "../../atoms/Font";

const Footer = () => {
  const CategoryShop = [
    { name: "All Products", to: "" },
    { name: "Fresh Flowers", to: "/shop" },
    { name: "Dried Flowers", to: "" },
    { name: "Live Plants", to: "" },
    { name: "Aroma Candles", to: "" },
    { name: "Designer Vases", to: "" },
    { name: "Freshener Fiffuser", to: "" },
  ];
  const ContactUs = [
    {
      name: "Address",
      content: "15/4 Khreshchatyk Street, Kyiv ",
    },
    {
      name: "Phone",
      content: "+380980099777",
    },
    {
      name: "General Enquiry:",
      content: "Kiev.Florist.Studio@gmail.com ",
    },
  ];
  return (
    <footer className=" border border-black grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 z-30  ">
      <section className=" col-span-1 min-h-[150px]   p-5 flex flex-col gap-3 ">
        <FontTextBody>
          Remember to offer beautiful flowers from Kyiv Florist Studio
          Valentines Day, Mothers Day, Christmas... Reminds you 7 days before.
          No spam or sharing your address
        </FontTextBody>
        <div className="  w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your Email"
            className=" p-4 w-full placeholder:text-xs focus:text-black  placeholder:border-blue-600 border"
          />
          <div className=" bg-black">
            <Button type="primary">Book A Call</Button>
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <FontTextH5 className=" text-gray self-stretch">
            Contact US
          </FontTextH5>
          {ContactUs.map((contact, i) => (
            <div key={i}>
              <FontTextCaption className=" text-gray">
                {contact.name}
              </FontTextCaption>
              <FontTextLink className="roll-on-hover">
                {contact.content}
              </FontTextLink>
            </div>
          ))}

          <div className="">
            <FontTextH5 className=" pb-4 text-gray">Follow Us</FontTextH5>
            <CardMediaSosial className={`  text-darktGray`} />
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <FontTextH5 className=" text-gray self-stretch">Shop</FontTextH5>
            <ul className=" flex flex-col gap-1">
              {CategoryShop.map((category, i) => (
                <FontTextLink key={i} to={category.to}>
                  {category.name}
                </FontTextLink>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <FontTextH5 className=" text-gray self-stretch">Service</FontTextH5>
            <ul className=" flex flex-col gap-1">
              <FontTextLink>Flower Subscription</FontTextLink>
              <FontTextLink>Wedding & Event Decor</FontTextLink>
            </ul>
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <FontTextH5 className=" text-gray self-stretch">
            Contact US
          </FontTextH5>
          <ul className=" flex flex-col gap-1">
            <FontTextLink>Our Story</FontTextLink>
            <FontTextLink>Blog</FontTextLink>
          </ul>
          <ul>
            {["Shipping & returns", "Terms & conditions", "Privacy policy"].map(
              (item, i) => (
                <FontTextLink key={i}>{item}</FontTextLink>
              )
            )}
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
