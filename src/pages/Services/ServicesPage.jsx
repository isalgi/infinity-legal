import HeaderServices from "../../components/Services/HeaderServices";
import ServicesList from "../../components/Services/ServicesList";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";

export default function ServicesPage() {
  return (
    <>
      <HeaderServices />
      <ServicesList />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
