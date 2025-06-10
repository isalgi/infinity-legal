// src/pages/Services/DetailServicePage.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";
import HeaderServices from "../../components/Services/HeaderServices";
import { fetchServiceBySlug } from "../../services/supabase/serviceService";

// Collapsible Documents Component
const CollapsibleDocuments = ({ documents }) => {
  const initialExpandedState = documents.reduce((acc, _, index) => {
    acc[index] = false;
    return acc;
  }, {});

  const [expandedItems, setExpandedItems] = useState(initialExpandedState);

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-4">
      {documents.map((document, index) => (
        <div key={index} className="flex">
          <button
            onClick={() => toggleItem(index)}
            className="mr-3 text-[#1196A9] focus:outline-none flex items-center justify-center w-6 h-6"
            aria-label={expandedItems[index] ? "Collapse" : "Expand"}
          >
            <span className="text-2xl font-bold">
              {expandedItems[index] ? "-" : "+"}
            </span>
          </button>
          <div className="flex-1">
            <h3
              className="text-lg font-medium text-gray-800 cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              {document.name}
            </h3>
            {expandedItems[index] && document.description && (
              <p className="text-gray-600 mt-1 text-sm">
                {document.description.charAt(0).toUpperCase() +
                  document.description.slice(1)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Integrated Pricing Display Component
const PricingDisplay = ({ pricingData, serviceName }) => {
  let pricing;
  try {
    pricing =
      typeof pricingData === "string" ? JSON.parse(pricingData) : pricingData;
  } catch (error) {
    console.error("Error parsing pricing data:", error);
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-xl font-medium text-[#1196A9] mb-6">Pricing</h3>
        <p className="text-gray-600">Pricing information unavailable</p>
      </div>
    );
  }

  // Handle consultation-based pricing
  // Handle consultation-based pricing
  if (pricing.pricing_type === "consultation") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.40)] flex flex-col h-full">
        <h3 className="text-xl font-medium text-[#1196A9] mb-6">Pricing</h3>

        <div className="flex-grow flex flex-col justify-center items-center text-center py-8">
          <p className="text-gray-600 text-lg mb-8">
            {pricing.consultation_note}
          </p>
        </div>

        <Link to="https://wa.me/6281239336293">
          <button className="w-full bg-[#1196A9] text-white py-3 px-6 rounded-md font-medium hover:bg-cyan-700 transition-colors">
            Ask us Now
          </button>
        </Link>
      </div>
    );
  }

  // Render pricing options
  const renderPricingOptions = () => {
    const options = [];

    Object.entries(pricing.pricing).forEach(([key, value]) => {
      if (key === "breakdown") return;

      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([serviceLevel, price]) => {
          if (serviceLevel !== "breakdown") {
            const processingTime =
              pricing.processing_time?.[serviceLevel] || "";
            const serviceLevelDisplay =
              serviceLevel.charAt(0).toUpperCase() + serviceLevel.slice(1);
            const keyDisplay = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            options.push({
              title: `${serviceLevelDisplay} ${keyDisplay}`,
              price: price,
              processingTime: processingTime,
              breakdown: value.breakdown,
            });
          }
        });
      } else {
        const processingTime = pricing.processing_time?.standard || "";
        const keyDisplay = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        options.push({
          title: keyDisplay,
          price: value,
          processingTime: processingTime,
        });
      }
    });

    return options;
  };

  const pricingOptions = renderPricingOptions();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.40)] flex flex-col h-full">
      <h3 className="text-xl font-medium text-[#1196A9] mb-6">Pricing</h3>

      {/* Important Notes */}
      {pricing.important_notes && pricing.important_notes.length > 0 && (
        <div className="mb-6 p-3 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
          {pricing.important_notes.map((note, index) => (
            <p key={index} className="text-sm text-blue-700">
              {note}
            </p>
          ))}
        </div>
      )}

      <div className="space-y-4 flex-grow">
        {pricingOptions.map((option, index) => (
          <div key={index} className="space-y-2">
            {/* Service Name */}
            <div className="font-medium text-gray-800">{option.title}</div>

            {/* Price and Processing Time */}
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {option.price}
              </span>
              {/* Processing Time below price */}
              {option.processingTime && (
                <div className="text-sm text-gray-600 mt-1">
                  {option.processingTime}
                </div>
              )}
            </div>

            {/* Breakdown if available */}
            {option.breakdown && (
              <div className="text-xs text-gray-500 space-y-1 mt-2">
                {Object.entries(option.breakdown).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                      :
                    </span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Separator line except for last item */}
            {index < pricingOptions.length - 1 && (
              <hr className="border-gray-200 mt-4" />
            )}
          </div>
        ))}
      </div>

      <Link to="https://wa.me/6281239336293">
        <button className="w-full mt-6 bg-[#1196A9] text-white py-3 px-6 rounded-md font-medium hover:bg-cyan-700 transition-colors">
          Ask us Now
        </button>
      </Link>
    </div>
  );
};

export default function DetailServicePage() {
  const { slug } = useParams();

  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => fetchServiceBySlug(slug),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <>
        <HeaderServices />
        <div className="container mx-auto px-5 py-16 pt-32 text-center">
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
        <div className="container mx-auto px-5 py-16 pt-32 text-center">
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

  const additionalImagesList = Array.isArray(service.additionalImages)
    ? service.additionalImages
    : service.additionalImages?.additionalImages &&
      Array.isArray(service.additionalImages.additionalImages)
    ? service.additionalImages.additionalImages
    : [];

  const formatTitle = (title) => {
    return title.toUpperCase();
  };

  return (
    <>
      <HeaderServices />

      {/* Hero Section - Grid Layout with Image on Right */}
      <section className="bg-white pt-32 max-md:pt-28 max-sm:pt-26">
        <div className="container mx-auto px-5 md:px-10 lg:px-16 mt-6">
          <div className="container mx-auto text-[#1196A9] text-[40px] leading-10 font-bold mb-14">
            {service.title}
          </div>
          {/* Hero Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="h-full">
              <h1 className="text-2xl font-bold text-gray-900">
                Best{" "}
                {service.category.charAt(0).toUpperCase() +
                  service.category.slice(1)}{" "}
                services you can get
              </h1>
              <div className="text-xl text-gray-600 mt-5 mb-10 space-y-4">
                {service.description.split("\n").map((line, index) => {
                  const trimmedLine = line.trim();

                  // Check if line should be a bullet point
                  if (
                    trimmedLine.match(
                      /^(Choose|Each|After|Valid|Must|Can|Will|Should|Allows|This)/i
                    ) ||
                    // Also check for lines that look like bullet points (short, descriptive lines)
                    (trimmedLine.length < 100 &&
                      (trimmedLine.includes("days") ||
                        trimmedLine.includes("years") ||
                        trimmedLine.includes("extendable") ||
                        trimmedLine.includes("return")))
                  ) {
                    return (
                      <div key={index} className="flex items-start gap-3 ml-4">
                        <span className="text-gray-400">•</span>
                        <span className="leading-relaxed">{trimmedLine}</span>
                      </div>
                    );
                  }

                  // Empty line for spacing
                  if (trimmedLine === "") {
                    return <div key={index} className="h-2"></div>;
                  }

                  // Regular paragraph
                  return <p key={index}>{trimmedLine}</p>;
                })}
              </div>
              <Link to={"/contact"}>
                <button className="bg-white border border-[#1196A9] text-[#1196A9] hover:bg-cyan-50 rounded-md px-4 py-2 mt-auto text-md font-medium">
                  Contact us
                </button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden ml-10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[290px] object-cover"
              />
            </div>
          </div>

          {/* Two Column Layout - Service Details and Pricing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 mt-16 px-32 items-stretch">
            {/* Left Column - Service Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.40)] flex flex-col h-full">
              <h3 className="text-xl font-medium text-[#1196A9] mb-6">
                {service.title}
              </h3>

              {/* Service Category */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-600">
                  {service.category.charAt(0).toUpperCase() +
                    service.category.slice(1)}
                </span>
              </div>

              {/* Features List with Checkmarks and Crosses */}
              <div className="space-y-3 mb-6 flex-grow">
                {/* Can Do Items (with cyan checks) */}
                {service.canDo &&
                  service.canDo.length > 0 &&
                  service.canDo.map((item, index) => (
                    <div
                      key={`can-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#1196A9] flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}

                {/* Cannot Do Items (with red crosses) */}
                {service.cannotDo &&
                  service.cannotDo.length > 0 &&
                  service.cannotDo.map((item, index) => (
                    <div
                      key={`cannot-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span className="text-red-500 flex-shrink-0 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="4" x2="2" y2="20"></line>
                          <line x1="2" y1="4" x2="22" y2="20"></line>
                        </svg>
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
              </div>

              <Link to="https://wa.me/6281239336293">
                <button className="w-full bg-[#1196A9] text-white py-3 px-6 rounded-md font-medium hover:bg-cyan-700 transition-colors">
                  Ask us Now
                </button>
              </Link>
            </div>

            {/* Right Column - Pricing */}
            <PricingDisplay
              pricingData={service.price}
              serviceName={service.title}
            />
          </div>

          {/* Required Documents Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Additional Image */}
              {additionalImagesList[0] && (
                <div className=" overflow-hidden">
                  <img
                    src={additionalImagesList[0]}
                    alt={`${service.title} documents`}
                    className="rounded-2xl w-full h-[360px] object-cover"
                  />
                </div>
              )}
              {/* Right Column - Documents List */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                  Required Document
                </h2>
                <CollapsibleDocuments
                  documents={service.required_documents || []}
                />
              </div>
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
