import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../../components/Home/HeroSection";
import ServicesSection from "../../components/Home/ServicesSection";
import AboutSection from "../../components/Home/AboutSection";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="relative min-h-screen">
        <HeroSection />
        <ServicesSection />
        <div id="about">
          <AboutSection />
        </div>
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
