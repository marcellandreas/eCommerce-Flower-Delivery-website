import { memo } from "react";
import { MainLayout } from "../../components/organisms";
import {
  AboutTemplate,
  BannerTemplate,
  BenefitTemplate,
  ContactTemplate,
  ReviewTemplate,
  ServiceTemplate,
} from "../../components/templates";

const Landing = memo(() => {
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
});

Landing.displayName = "Landing";

export default Landing;