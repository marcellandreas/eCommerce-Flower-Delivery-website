import { Button, Text } from "../../atoms";
import { CardMediaSosial } from "../../molecules/Card";

const Footer = () => {
  const CategoryShop = [
    { name: "All Products", to: "/shop" },
    { name: "Fresh Flowers", to: "/shop" },
    { name: "Dried Flowers", to: "/shop" },
    { name: "Live Plants", to: "/shop" },
    { name: "Aroma Candles", to: "/shop" },
    { name: "Designer Vases", to: "/shop" },
    { name: "Freshener Fiffuser", to: "/shop" },
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
        <Text level="body">
          Remember to offer beautiful flowers from Kyiv Florist Studio
          Valentines Day, Mothers Day, Christmas... Reminds you 7 days before.
          No spam or sharing your address
        </Text>
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
          <Text level="h5" className=" text-gray self-stretch">
            Contact US
          </Text>
          {ContactUs.map((contact, i) => (
            <div key={i}>
              <Text level="caption" className=" text-gray">
                {contact.name}
              </Text>
              <Text level="link" className="roll-on-hover">
                {contact.content}
              </Text>
            </div>
          ))}

          <div className="">
            <Text level="h5" className=" pb-4 text-gray">
              Follow Us
            </Text>
            <CardMediaSosial className={`  text-darktGray`} />
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Text level="h5" className=" text-gray self-stretch">
              Shop
            </Text>
            <ul className=" flex flex-col gap-1">
              {CategoryShop.map((category, i) => (
                <Text level="link" key={i} to={category.to}>
                  {category.name}
                </Text>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <Text level="h5" className=" text-gray self-stretch">
              Service
            </Text>
            <ul className=" flex flex-col gap-1">
              <Text level="link">Flower Subscription</Text>
              <Text level="link">Wedding & Event Decor</Text>
            </ul>
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <Text level="h5" className=" text-gray self-stretch">
            Contact US
          </Text>
          <ul className=" flex flex-col gap-1">
            <Text level="link">Our Story</Text>
            <Text level="link">Blog</Text>
          </ul>
          <ul>
            {["Shipping & returns", "Terms & conditions", "Privacy policy"].map(
              (item, i) => (
                <Text level="link" key={i}>
                  {item}
                </Text>
              )
            )}
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
