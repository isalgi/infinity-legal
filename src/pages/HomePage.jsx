import Header from "../components/Home/Header";
import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import AboutSection from "../components/Home/AboutSection";
import ReviewsSection from "../components/Home/ReviewsSection";
import FaqSection from "../components/Home/FaqSection";
import ContactSection from "../components/Home/ContactSection";
import Footer from "../components/Home/Footer";

function InfinityLegal() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Nunito+Sans:wght@400;600;700&family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <div className="relative min-h-screen">
        <Header />
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

export default InfinityLegal;
