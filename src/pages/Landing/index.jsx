import Navbar from "../../components/organisms/Navbar";
import AboutUs from "../../components/templates/AboutUs";
import Banner from "../../components/templates/Banner";
import Benefits from "../../components/templates/Benefits";
import ContactUs from "../../components/templates/ContactUs";
import Reviews from "../../components/templates/Reviews";
import Service from "../../components/templates/Service";
import Footer from "../../components/organisms/footer";

const Landing = () => {
  return (
    <main className=" bg-white w-full">
      <Navbar />
      <Banner />
      <AboutUs />
      <Benefits />
      <ContactUs />
      <Service />
      <Reviews />
      <Footer />
    </main>
  );
};

export default Landing;
