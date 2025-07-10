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

  // Custom scroll function with offset for specific sections
  const scrollToSectionWithOffset = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate header height
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

      // Special handling for "services" section
      if (sectionId === "services") {
        const additionalOffset = window.innerHeight * 0.001;

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition =
          elementPosition - headerHeight - additionalOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      }
      // Special handling for "contact" section
      else if (sectionId === "contact") {
        const additionalOffset = window.innerHeight * 0.015;

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition =
          elementPosition - headerHeight - additionalOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth",
        });
      } else {
        // Normal scroll for all other sections (about)
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        scrollToSectionWithOffset(sectionId);
      }, 100);
    }
  }, [location]);

  return (
    <>
      <div className="relative min-h-screen">
        <HeroSection />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <ReviewsSection />
        <FaqSection />
        <div id="contact">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
