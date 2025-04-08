import { MainLayout } from "../../components/organisms";
import {
  AboutTemplate,
  BannerTemplate,
  BenefitTemplate,
  ContactTemplate,
  ReviewTemplate,
  ServiceTemplate,
} from "../../components/templates";

const Landing = () => {
  return (
    <MainLayout>
      <BannerTemplate />
      <AboutTemplate />
      <BenefitTemplate />
      <ContactTemplate />
      <ServiceTemplate />
      <ReviewTemplate />
    </MainLayout>
  );
};

export default Landing;
