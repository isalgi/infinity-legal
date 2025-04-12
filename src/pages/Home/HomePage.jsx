import HeroSection from "../../components/Home/HeroSection";
import ServicesSection from "../../components/Home/ServicesSection";
import AboutSection from "../../components/Home/AboutSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";

function HomePage() {
  return (
    <>
      <div className="relative min-h-screen">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
