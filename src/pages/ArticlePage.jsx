import ReviewsSection from "../components/Home/ReviewsSection";
import FaqSection from "../components/Home/FaqSection";
import ContactSection from "../components/Home/ContactSection";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";

function ArticlePage() {
  return (
    <>
      <div className="relative min-h-screen">
        <Header />
        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default ArticlePage;
