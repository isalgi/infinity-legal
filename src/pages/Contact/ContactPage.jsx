import ContactInfo from "../../components/Contact/ContactInfo";
import HeaderContact from "../../components/Contact/HeaderContact";
import HeroSection from "../../components/Contact/HeroSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";

export default function ContactPage() {
  return (
    <>
      <HeaderContact />
      <div className="px-12 max-lg:px-8 max-md:px-6 max-sm:px-4 pt-32 max-lg:pt-28 max-md:pt-24 max-sm:pt-20">
        <HeroSection />
        <ContactInfo />
      </div>
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
