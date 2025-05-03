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

  return (
    <>
      <HeaderServices />

      <div className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="mb-8">
            <Link
              to="/services"
              className="text-cyan-600 flex items-center gap-2 mb-4"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto rounded-lg object-cover mb-6"
                />
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              </div>

              {service.features && service.features.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    What you get from our services
                  </h2>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-cyan-500 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                            <path d="M7.5 12.5L10.5 15.5L16 10"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Let's get you started
                </h2>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>

                {service.price && (
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-800">
                        From
                      </span>
                      <span className="text-4xl font-bold text-cyan-600 ml-2">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      *Prices include taxes
                    </p>
                  </div>
                )}

                <button className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-700 transition-colors">
                  Ask us Now
                </button>

                {service.features && service.features.length > 0 && (
                  <div className="mt-8 space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span
                          className={
                            feature.included !== false
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {feature.included !== false ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20 6L9 17L4 12"></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          )}
                        </span>
                        <span
                          className={
                            feature.included !== false
                              ? "text-gray-700"
                              : "text-gray-400"
                          }
                        >
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm text-gray-500 mt-6">
                  *Includes personal service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
