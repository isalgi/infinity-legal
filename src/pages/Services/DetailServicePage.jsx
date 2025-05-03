// src/pages/Services/DetailServicePage.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";
import HeaderServices from "../../components/Services/HeaderServices";
import { fetchServiceBySlug } from "../../services/supabase/serviceService";

export default function DetailServicePage() {
  const { slug } = useParams();

  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => fetchServiceBySlug(slug),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <>
        <HeaderServices />
        <div className="container mx-auto px-5 py-16 text-center">
          <div className="text-cyan-600 text-xl">
            Loading service details...
          </div>
        </div>
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <HeaderServices />
        <div className="container mx-auto px-5 py-16 text-center">
          <h1 className="text-2xl font-medium text-gray-700">
            {error ? "Failed to load service" : "Service not found"}
          </h1>
          <Link to="/services" className="text-cyan-600 mt-4 inline-block">
            Return to services
          </Link>
        </div>
      </>
    );
  }

  // Safely handle features data structure
  const featuresList = Array.isArray(service.features)
    ? service.features
    : service.features?.features && Array.isArray(service.features.features)
    ? service.features.features
    : [];

  // Safely handle additionalImages data structure
  const additionalImagesList = Array.isArray(service.additionalImages)
    ? service.additionalImages
    : service.additionalImages?.additionalImages &&
      Array.isArray(service.additionalImages.additionalImages)
    ? service.additionalImages.additionalImages
    : [];

  return (
    <>
      <HeaderServices />

      {/* Hero Section - Grid Layout with Image on Right */}
      <section className="bg-white pt-10">
        <div className="container mx-auto text-[#1196A9] text-3xl font-semibold">
          {service.title}
        </div>
        <div className="container mx-auto px-5 md:px-10 lg:px-16">
          {/* Hero Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 my-[30px]">
                Best{" "}
                {service.category.charAt(0).toUpperCase() +
                  service.category.slice(1)}{" "}
                services you can get
              </h1>
              <p className="text-lg text-gray-600 mt-5 mb-10">
                {service.description}
              </p>
              <button className="bg-white border border-[#1196A9] text-[#1196A9] hover:bg-cyan-50 rounded-md px-4 py-2 mt-4 text-sm font-medium">
                Contact us
              </button>
            </div>
            <div className="rounded-xl overflow-hidden ml-10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* About Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-center text-[#1196A9]">
              What you get from our services
            </h2>
          </div>
        </div>
      </section>

      {/* Features Section - Grid Layout with Image on Right */}
      <section className="bg-white pt-10 pb-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div>
              {/* Features with + Icons */}
              <div className="space-y-6">
                {featuresList.length > 0 &&
                  featuresList.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-[#1196A9] mt-1 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 pr-10">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Manage Button */}
              <button className="mt-8 border border-[#1196A9] text-[#1196A9] hover:bg-cyan-50 rounded-md px-4 py-2 text-sm font-medium">
                Hubungi Kami
              </button>
            </div>

            {/* First Additional Image on Right */}
            {additionalImagesList[0] && (
              <div className="rounded-xl overflow-hidden h-full">
                <img
                  src={additionalImagesList[0]}
                  alt={`${service.title} process`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Let's Get Started Section with Background Image */}
      <section className="py-16 relative">
        {/* Background Image - Second Additional Image */}
        {additionalImagesList[1] && (
          <div className="absolute inset-0 z-0">
            <img
              src={additionalImagesList[1]}
              alt="Background"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.8)" }}
            />
          </div>
        )}

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Let's get you started
            </h2>

            {/* White Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto w-full">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                tincidunt sit amet lorem quis dignissim.
              </p>

              {service.price && (
                <div className="mb-8">
                  <div className="flex items-baseline flex-col">
                    <span className="text-lg">From</span>
                    <span className="text-2xl font-bold text-black">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 mt-1">
                    All pricing exclude PPN
                  </p>
                </div>
              )}

              <button className="w-full bg-cyan-600 text-white py-3 px-6 rounded-md font-medium hover:bg-cyan-700 transition-colors">
                Ask us Now
              </button>

              <p className="text-sm text-gray-800 font-semibold mt-4">
                {service.category.charAt(0).toUpperCase() +
                  service.category.slice(1)}
              </p>

              {/* Features List with Checkmarks and Crosses */}
              <div className="mt-4">
                {/* Combined List of Can Do and Cannot Do */}
                <div className="space-y-2">
                  {/* Can Do Items (with green checks) */}
                  {service.canDo &&
                    service.canDo.length > 0 &&
                    service.canDo.map((item, index) => (
                      <div
                        key={`can-${index}`}
                        className="flex items-start gap-2"
                      >
                        <span className="text-green-500 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}

                  {/* Cannot Do Items (with red crosses) */}
                  {service.cannotDo &&
                    service.cannotDo.length > 0 &&
                    service.cannotDo.map((item, index) => (
                      <div
                        key={`cannot-${index}`}
                        className="flex items-start gap-2"
                      >
                        <span className="text-red-500 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                *Includes personal services
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
