// Route.jsx
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "../components/ScrollToTop";

// Lazy load components
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const ServicesPage = lazy(() => import("../pages/Services/ServicesPage"));
const ArticlePage = lazy(() => import("../pages/News/ArticlePage"));
const DetailArticlePage = lazy(() => import("../pages/News/DetailArticlePage"));
const ContactPage = lazy(() => import("../pages/Contact/ContactPage"));
const DetailServicePage = lazy(() => import("../pages/Services/DetailServicePage"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<DetailServicePage />} />
          <Route path="/news" element={<ArticlePage />} />
          <Route path="/news/:slug" element={<DetailArticlePage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
