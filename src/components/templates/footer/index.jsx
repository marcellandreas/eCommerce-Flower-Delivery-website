import { Button } from "../../atoms/Button";
import CardMediaSosial from "../../molecules/CardMediaSosial";

const Footer = () => {
  return (
    <footer className=" border border-black grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4  ">
      <section className=" col-span-1 min-h-[150px]   p-5 flex flex-col gap-3 ">
        <p>
          Remember to offer beautiful flowers from Kyiv Florist Studio
          Valentines Day, Mothers Day, Christmas... Reminds you 7 days before.
          No spam or sharing your address
        </p>
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
          <h5 className=" text-gray text-xl font-semibold">Contact US</h5>
          <div>
            <p className=" text-gray">Address</p>
            <span className="roll-on-hover">
              15/4 Khreshchatyk Street, Kyiv
            </span>
          </div>
          <div>
            <p className=" text-gray">Phone</p>
            <span className="roll-on-hover">+380980099777</span>
          </div>
          <div>
            <p className=" text-gray">General Enquiry:</p>
            <span className="roll-on-hover">Kiev.Florist.Studio@gmail.com</span>
          </div>
          <div className="">
            <p className=" pb-4 text-gray text-xl">Follow Us</p>
            <CardMediaSosial className={`  text-darktGray`} />
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h5 className=" text-gray text-xl font-semibold">Contact US</h5>
            <ul className=" flex flex-col gap-1">
              <li>All Products</li>
              <li>Fresh Flowers</li>
              <li>Dried Flowers</li>
              <li>Live Plants</li>
              <li>Aroma Candles</li>
              <li>Designer Vases</li>
              <li>Freshener Fiffuser</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className=" text-gray text-xl font-semibold">Service</h5>
            <ul className=" flex flex-col gap-1">
              <li>Flower Subscription</li>
              <li>Wedding & Event Decor</li>
            </ul>
          </div>
        </div>
      </section>
      <section className=" col-span-1 min-h-[150px] border-l p-5 ">
        <div className="flex flex-col gap-4">
          <h5 className=" text-gray text-xl font-semibold">Contact US</h5>
          <ul className=" flex flex-col gap-1">
            <li>Our Story</li>
            <li>Blog</li>
          </ul>
          <ul>
            <li>Shipping & returns</li>
            <li>Terms & conditions</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
