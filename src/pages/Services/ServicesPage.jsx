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
      <div className="pt-32 max-md:pt-28 max-sm:pt-26">
        <ServicesList />
      </div>
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
