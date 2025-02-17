import AboutUs from "../../components/templates/AboutUs";
import Banner from "../../components/templates/Banner";
import Benefits from "../../components/templates/Benefits";
import ContactUs from "../../components/templates/ContactUs";
import Reviews from "../../components/templates/Reviews";
import Service from "../../components/templates/Service";
import { MainLayout } from "../../components/Layout/MainLayout";

const Landing = () => {
  return (
    <MainLayout>
      <Banner />
      <AboutUs />
      <Benefits />
      <ContactUs />
      <Service />
      <Reviews />
    </MainLayout>
  );
};

export default Landing;
