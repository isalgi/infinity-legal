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
      <div className="px-12">
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
