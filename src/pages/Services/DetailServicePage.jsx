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

// Helper function to parse JSON string fields
const parseJsonField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.error("Error parsing JSON field:", error);
      return [];
    }
  }
  return [];
};

// Helper function to get proper image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath; // Already full URL
  if (imagePath.startsWith("/")) return imagePath; // Already absolute path
  return `${imagePath}`; // Add storage prefix
};

// Collapsible Documents Component
const CollapsibleDocuments = ({ documents }) => {
  const parsedDocuments = parseJsonField(documents);

  const initialExpandedState = parsedDocuments.reduce((acc, _, index) => {
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
      {parsedDocuments.map((document, index) => (
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

  // Parse JSON string fields
  const parsedCanDo = parseJsonField(service.canDo);
  const parsedCannotDo = parseJsonField(service.cannotDo);

  return (
    <>
      <HeaderServices />

      {/* Hero Section - Grid Layout with Image on Right */}
      <section className="bg-white pt-32 max-md:pt-28 max-sm:pt-26 ">
        {/* First Container - Title and Hero Grid */}
        <div className="container mx-auto px-5 md:px-10 lg:px-16 mt-6">
          <div className="container mx-auto text-[#1196A9] text-[40px] leading-10 font-bold mb-14">
            {service.title}
          </div>
          {/* Hero Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div className="h-full">
              <h1 className="text-2xl font-bold text-gray-900">
                Best{" "}
                {service.category.charAt(0).toUpperCase() +
                  service.category.slice(1)}{" "}
                services you can get
              </h1>
              <div className="text-xl text-gray-600 mt-5 mb-10 space-y-2">
                {service.description.split("\n").map((line, index) => {
                  const trimmedLine = line.trim();

                  // Empty line for spacing
                  if (trimmedLine === "") {
                    return <div key={index} className="h-2"></div>;
                  }

                  // Check if line starts with bullet marker
                  if (trimmedLine.startsWith("-")) {
                    return (
                      <div key={index} className="flex items-start gap-3 ml-4">
                        <span className="text-gray-400">•</span>
                        <span className="leading-relaxed">
                          {trimmedLine.substring(1).trim()}
                        </span>
                      </div>
                    );
                  }

                  // Check if it's a header (short line, title case, or specific header patterns)
                  if (
                    trimmedLine.length < 50 &&
                    (trimmedLine.includes("&") ||
                      trimmedLine.toLowerCase().includes("why you need"))
                  ) {
                    return (
                      <h4
                        key={index}
                        className="font-semibold text-gray-800 mt-6 mb-2"
                      >
                        {trimmedLine}
                      </h4>
                    );
                  }

                  // Regular paragraph
                  return <p key={index}>{trimmedLine}</p>;
                })}
              </div>
              <Link to={"/"}>
                <button className="bg-white border border-[#1196A9] text-[#1196A9] hover:bg-cyan-50 rounded-md px-4 py-2 mt-auto text-md font-medium">
                  Contact
                </button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden ml-10">
              <img
                src={getImageUrl(service.image)}
                alt={service.title}
                className="w-full h-[480px] object-cover"
                onError={(e) => {
                  console.error("Failed to load main image:", service.image);
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* CONDITIONALLY RENDERED - Two Column Layout - Service Details and Pricing with Background */}
        {(service.canDo !== null || service.cannotDo !== null) && (
          <div
            className="w-full mb-16 mt-16 relative"
            style={{
              backgroundImage: `url('/images/new-image.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Content container */}
            <div className="relative z-10 px-5 py-16 max-w-4xl 2xl:max-w-7xl mx-auto">
              {/* Service Details and Pricing Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-8">
                {/* Left Column - Service Details */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-[#1196A9] mb-6">
                    {service.title}
                  </h3>

                  {/* Features List with Checkmarks and Crosses */}
                  <div className="space-y-4 mb-6 flex-grow">
                    {/* Can Do Items (with cyan checks) */}
                    {parsedCanDo &&
                      parsedCanDo.length > 0 &&
                      parsedCanDo.map((item, index) => (
                        <div
                          key={`can-${index}`}
                          className="flex items-start gap-3"
                        >
                          <span className="text-[#1196A9] flex-shrink-0 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
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
                          <span className="text-gray-700 text-base leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}

                    {/* Cannot Do Items (with red crosses) */}
                    {parsedCannotDo &&
                      parsedCannotDo.length > 0 &&
                      parsedCannotDo.map((item, index) => (
                        <div
                          key={`cannot-${index}`}
                          className="flex items-start gap-3"
                        >
                          <span className="text-red-500 flex-shrink-0 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
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
                          <span className="text-gray-700 text-base leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>

                  <Link to="https://wa.me/6281239336293">
                    <button className="w-full bg-[#1196A9] text-white py-3 px-6 rounded-md font-semibold text-base hover:bg-cyan-700 transition-colors">
                      Ask us Now
                    </button>
                  </Link>
                </div>

                {/* Right Column - Pricing with Enhanced Font Sizes */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-[#1196A9] mb-6">
                    Pricing
                  </h3>

                  {(() => {
                    let pricing;
                    try {
                      pricing =
                        typeof service.price === "string"
                          ? JSON.parse(service.price)
                          : service.price;
                    } catch (error) {
                      console.error("Error parsing pricing data:", error);
                      return (
                        <div className="flex flex-col h-full">
                          <p className="text-gray-600 text-lg">
                            Pricing information unavailable
                          </p>
                        </div>
                      );
                    }

                    // Handle consultation-based pricing
                    if (pricing.pricing_type === "consultation") {
                      return (
                        <div className="flex flex-col h-full">
                          <div className="flex-grow flex flex-col justify-center items-center text-center py-8">
                            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                              {pricing.consultation_note}
                            </p>
                          </div>

                          <Link to="https://wa.me/6281239336293">
                            <button className="w-full bg-[#1196A9] text-white py-3 px-6 rounded-md font-semibold text-base hover:bg-cyan-700 transition-colors">
                              Ask us Now
                            </button>
                          </Link>
                        </div>
                      );
                    }

                    // Render pricing options
                    const renderPricingOptions = () => {
                      const options = [];

                      Object.entries(pricing.pricing).forEach(
                        ([key, value]) => {
                          if (key === "breakdown") return;

                          if (typeof value === "object" && value !== null) {
                            Object.entries(value).forEach(
                              ([serviceLevel, price]) => {
                                if (serviceLevel !== "breakdown") {
                                  const processingTime =
                                    pricing.processing_time?.[serviceLevel] ||
                                    "";
                                  const serviceLevelDisplay =
                                    serviceLevel.charAt(0).toUpperCase() +
                                    serviceLevel.slice(1);
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
                              }
                            );
                          } else {
                            const processingTime =
                              pricing.processing_time?.standard || "";
                            const keyDisplay = key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase());

                            options.push({
                              title: keyDisplay,
                              price: value,
                              processingTime: processingTime,
                            });
                          }
                        }
                      );

                      return options;
                    };

                    const pricingOptions = renderPricingOptions();

                    return (
                      <div className="flex flex-col h-full">
                        {/* Important Notes */}
                        {pricing.important_notes &&
                          pricing.important_notes.length > 0 && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-400">
                              {pricing.important_notes.map((note, index) => (
                                <p
                                  key={index}
                                  className="text-base text-blue-700 leading-relaxed"
                                >
                                  {note}
                                </p>
                              ))}
                            </div>
                          )}

                        <div className="space-y-6 flex-grow">
                          {pricingOptions.map((option, index) => (
                            <div key={index} className="space-y-3">
                              {/* Service Name */}
                              <div className="font-semibold text-gray-800 text-lg">
                                {option.title}
                              </div>

                              {/* Price and Processing Time */}
                              <div>
                                <span className="text-3xl font-bold text-gray-900">
                                  {option.price}
                                </span>
                                {/* Processing Time below price */}
                                {option.processingTime && (
                                  <div className="text-base text-gray-600 mt-2">
                                    {option.processingTime}
                                  </div>
                                )}
                              </div>

                              {/* Breakdown if available */}
                              {option.breakdown && (
                                <div className="text-sm text-gray-500 space-y-2 mt-3">
                                  {Object.entries(option.breakdown).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex justify-between"
                                      >
                                        <span>
                                          {key
                                            .replace(/_/g, " ")
                                            .replace(/\b\w/g, (l) =>
                                              l.toUpperCase()
                                            )}
                                          :
                                        </span>
                                        <span className="font-medium">
                                          {value}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                              {/* Separator line except for last item */}
                              {index < pricingOptions.length - 1 && (
                                <hr className="border-gray-200 mt-6" />
                              )}
                            </div>
                          ))}
                        </div>

                        <Link to="https://wa.me/6281239336293">
                          <button className="w-full mt-8 bg-[#1196A9] text-white py-3 px-6 rounded-md font-semibold text-base hover:bg-cyan-700 transition-colors">
                            Ask us Now
                          </button>
                        </Link>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Services Extra Information Cards - Outside Background Container */}
        {service.category === "legal services" &&
          service.extraDetails &&
          (() => {
            const extraDetails = service.extraDetails;
            const cards = [];

            // Card for "What is" or general information
            if (extraDetails.whatIs || extraDetails.whatIsLegalisation) {
              cards.push({
                title:
                  service.slug === "legalisation-services"
                    ? "What is Legalisation?"
                    : "Why You Need Tax and Accounting",
                content: extraDetails.whatIsLegalisation || extraDetails.whatIs,
                type: "text",
              });
            }

            // Card for services offered/document types
            if (extraDetails.servicesOffered) {
              cards.push({
                title: "Services We Offer",
                content: extraDetails.servicesOffered,
                type: "list",
              });
            }

            if (extraDetails.documentsWeCanReview) {
              cards.push({
                title: "Documents We Can Review",
                content: extraDetails.documentsWeCanReview,
                type: "list",
              });
            }

            if (extraDetails.agreementTypes) {
              cards.push({
                title: "Types of Agreements We Can Draft",
                content: extraDetails.agreementTypes,
                type: "list",
              });
            }

            // Card for advantages
            if (extraDetails.advantages) {
              cards.push({
                title: "Our Advantages",
                content: extraDetails.advantages,
                type: "list",
              });
            }

            // Card for benefits
            if (extraDetails.benefits) {
              cards.push({
                title: "Benefits to You",
                content: extraDetails.benefits,
                type: "list",
              });
            }

            // Card for process
            if (extraDetails.process) {
              cards.push({
                title:
                  service.slug === "tax-accounting-services"
                    ? "How the Tax and Accounting Process Works"
                    : "Process",
                content: extraDetails.process,
                type: "list",
              });
            }

            if (extraDetails.notarisationProcess) {
              cards.push({
                title: "How the Notarisation Process Works",
                content: extraDetails.notarisationProcess,
                type: "list",
              });
            }

            if (extraDetails.legalisationProcess) {
              cards.push({
                title: "How the Legalisation Process Works",
                content: extraDetails.legalisationProcess,
                type: "list",
              });
            }

            // Card for why you need specific services
            if (extraDetails.whyYouNeedLawyer) {
              cards.push({
                title:
                  "Why You Need a Lawyer in Litigation or Criminal Matters",
                content: extraDetails.whyYouNeedLawyer,
                type: "list",
              });
            }

            if (extraDetails.whyNotarise) {
              cards.push({
                title: "Why You Need to Notarise Important Documents",
                content: extraDetails.whyNotarise,
                type: "list",
              });
            }

            if (extraDetails.whyYouNeed) {
              cards.push({
                title: "Why You May Need Legalisation",
                content: extraDetails.whyYouNeed,
                type: "list",
              });
            }

            // Cards for specific processes
            if (extraDetails.propertyPurchaseProcess) {
              cards.push({
                title: "Property Purchase Process (With Legal Representation)",
                content: extraDetails.propertyPurchaseProcess,
                type: "list",
              });
            }

            if (extraDetails.propertySaleProcess) {
              cards.push({
                title: "Property Sale Process (With Legal Representation)",
                content: extraDetails.propertySaleProcess,
                type: "list",
              });
            }

            if (extraDetails.disputeResolutionServices) {
              cards.push({
                title: "Dispute Resolution & Litigation",
                content: extraDetails.disputeResolutionServices,
                type: "list",
              });
            }

            if (extraDetails.legalStrategyServices) {
              cards.push({
                title: "Legal Strategy & Case Management",
                content: extraDetails.legalStrategyServices,
                type: "list",
              });
            }

            if (extraDetails.whyYouNeedLegal) {
              cards.push({
                title: "Why You Need Legal Representation",
                content: extraDetails.whyYouNeedLegal,
                type: "list",
              });
            }

            if (extraDetails.legalAgreementDraftingProcess) {
              cards.push({
                title: "Legal Agreement Drafting Process",
                content: extraDetails.legalAgreementDraftingProcess,
                type: "list",
              });
            }

            if (cards.length === 0) return null;

            return (
              <div
                className="w-full my-16 relative"
                style={{
                  backgroundImage: `url('/images/new-image.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 px-5 py-16 max-w-4xl 2xl:max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {cards.map((card, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] h-full flex flex-col"
                      >
                        <h3 className="text-xl font-semibold text-[#1196A9] mb-4">
                          {card.title}
                        </h3>
                        <div className="flex-grow mb-6">
                          {card.type === "text" ? (
                            <p className="text-gray-700 text-base leading-relaxed">
                              {card.content}
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {card.content.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="flex items-start gap-3"
                                >
                                  <span className="text-[#1196A9] flex-shrink-0 mt-1">
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
                                  <span className="text-gray-700 text-base leading-relaxed">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Link to="https://wa.me/6281239336293">
                          <button className="w-full bg-[#1196A9] text-white py-3 px-6 rounded-md font-semibold text-base hover:bg-cyan-700 transition-colors">
                            Ask us Now
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Third Container - Required Documents Section */}
        <div className="container mx-auto px-5 md:px-10 lg:px-16">
          {/* Required Documents Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Additional Image */}
              {service.additionalImage && (
                <div className="overflow-hidden">
                  <img
                    src={getImageUrl(service.additionalImage)}
                    alt={`${service.title} documents`}
                    className="rounded-2xl w-full h-[360px] object-cover"
                    onError={(e) => {
                      console.error(
                        "Failed to load additional image:",
                        service.additionalImage
                      );
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
              {/* Right Column - Documents List */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                  {service.title === "Property Transaction Legal Services"
                    ? "Legal Documents You Will Receive"
                    : "Required Document"}
                </h2>
                <CollapsibleDocuments documents={service.required_documents} />
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
