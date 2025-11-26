import { useState, memo, useCallback } from "react";
import { Button, Text } from "../../atoms";
import { CardMediaSosial } from "../../molecules";

// Configuration
const SHOP_CATEGORIES = [
  { name: "All Products", to: "/shop" },
  { name: "Fresh Flowers", to: "/shop/Fresh%20Flowers" },
  { name: "Dried Flowers", to: "/shop/Dried%20Flowers" },
  { name: "Live Plants", to: "/shop/Live%20Plants" },
  { name: "Aroma Candles", to: "/shop/Aroma%20Candles" },
  { name: "Designer Vases", to: "/shop/Designer%20Vases" },
  { name: "Freshener Diffuser", to: "/shop/Freshener%20Diffuser" },
];

const SERVICES = [
  { name: "Flower Subscription", to: "/subcribe-now" },
  { name: "Wedding & Event Decor", to: "/contact" },
];

const ABOUT_LINKS = [
  { name: "Our Story", to: "/about" },
  { name: "Blog", to: "#" },
];

const LEGAL_LINKS = [
  "Shipping & returns",
  "Terms & conditions",
  "Privacy policy",
];

const CONTACT_INFO = [
  {
    name: "Address",
    content: "15/4 Khreshchatyk Street, Kyiv",
  },
  {
    name: "Phone",
    content: "+380980099777",
    href: "tel:+380980099777",
  },
  {
    name: "General Enquiry",
    content: "Kiev.Florist.Studio@gmail.com",
    href: "mailto:Kiev.Florist.Studio@gmail.com",
  },
];

const FooterSection = memo(({ title, children }) => (
  <section className="col-span-1 min-h-[150px] border-l dark:border-dark-border p-5">
    <div className="flex flex-col gap-4">
      <Text level="h5" className="text-gray dark:text-dark-textSecondary self-stretch">
        {title}
      </Text>
      {children}
    </div>
  </section>
));

FooterSection.displayName = "FooterSection";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
    setSubscribeStatus("");
  }, []);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setSubscribeStatus("Please enter a valid email");
      return;
    }

    // Handle subscription logic
    console.log("Subscribe email:", email);
    setSubscribeStatus("Thank you for subscribing!");
    setEmail("");
  }, [email]);

  return (
    <footer className="border border-black dark:border-dark-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 z-30 bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Newsletter Section */}
      <section className="col-span-1 min-h-[150px] p-5 flex flex-col gap-4">
        <Text level="body" className="text-gray-700 dark:text-dark-textSecondary">
          Remember to offer beautiful flowers from Kyiv Florist Studio on
          Valentine's Day, Mother's Day, Christmas... Reminds you 7 days before.
          No spam or sharing your address.
        </Text>

        <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            className="p-4 w-full placeholder:text-sm text-sm text-black dark:text-dark-text bg-white dark:bg-dark-surface border border-lightGray dark:border-dark-border focus:border-gray dark:focus:border-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300"
            aria-label="Email for newsletter"
            required
          />
          {subscribeStatus && (
            <Text
              level="caption"
              className={subscribeStatus.includes("Thank") ? "text-success" : "text-error"}
            >
              {subscribeStatus}
            </Text>
          )}
          <div className="bg-black dark:bg-white">
            <Button type="primary">Subscribe</Button>
          </div>
        </form>
      </section>

      {/* Contact Section */}
      <FooterSection title="Contact Us">
        {CONTACT_INFO.map((contact) => (
          <div key={contact.name} className="flex flex-col gap-1">
            <Text level="caption" className="text-gray dark:text-dark-textSecondary">
              {contact.name}
            </Text>
            {contact.href ? (
              <a
                href={contact.href}
                className="hover:underline transition-all duration-200"
              >
                <Text level="link" className="dark:text-dark-text">{contact.content}</Text>
              </a>
            ) : (
              <Text level="link" className="dark:text-dark-text">{contact.content}</Text>
            )}
          </div>
        ))}

        <div className="mt-4">
          <Text level="h5" className="pb-4 text-gray dark:text-dark-textSecondary">
            Follow Us
          </Text>
          <CardMediaSosial className="text-darkGray dark:text-dark-text" />
        </div>
      </FooterSection>

      {/* Shop & Services Section */}
      <FooterSection title="Shop">
        <ul className="flex flex-col gap-1">
          {SHOP_CATEGORIES.map((category) => (
            <li key={category.name}>
              <Text level="link" to={category.to} className="dark:text-dark-text">
                {category.name}
              </Text>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 mt-4">
          <Text level="h5" className="text-gray dark:text-dark-textSecondary self-stretch">
            Service
          </Text>
          <ul className="flex flex-col gap-1">
            {SERVICES.map((service) => (
              <li key={service.name}>
                <Text level="link" to={service.to} className="dark:text-dark-text">
                  {service.name}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </FooterSection>

      {/* About & Legal Section */}
      <FooterSection title="About">
        <ul className="flex flex-col gap-1">
          {ABOUT_LINKS.map((link) => (
            <li key={link.name}>
              <Text level="link" to={link.to} className="dark:text-dark-text">
                {link.name}
              </Text>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-1 mt-4">
          {LEGAL_LINKS.map((item) => (
            <li key={item}>
              <Text level="link" to="#" className="dark:text-dark-text">
                {item}
              </Text>
            </li>
          ))}
        </ul>
      </FooterSection>
    </footer>
  );
};

export default memo(Footer);