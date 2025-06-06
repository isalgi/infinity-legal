// src/components/Home/ServicesSection.jsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAllServices } from "../../services/supabase/serviceService";
import ServiceCard from "./ServiceCard";

// Function to get the lowest price from standardized pricing format
const getLowestPrice = (pricingData) => {
  try {
    const pricing =
      typeof pricingData === "string" ? JSON.parse(pricingData) : pricingData;

    if (pricing.pricing_type === "consultation") {
      return "Based on consultation";
    }

    let prices = [];

    Object.entries(pricing.pricing).forEach(([key, value]) => {
      if (key === "breakdown") return;

      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([serviceLevel, price]) => {
          if (serviceLevel !== "breakdown" && typeof price === "string") {
            const numericPrice = price.replace(/[^\d]/g, "");
            if (numericPrice) prices.push(parseInt(numericPrice));
          }
        });
      } else if (typeof value === "string") {
        const numericPrice = value.replace(/[^\d]/g, "");
        if (numericPrice) prices.push(parseInt(numericPrice));
      }
    });

    if (prices.length === 0) return "Contact us";

    const minPrice = Math.min(...prices);
    return `IDR ${minPrice.toLocaleString()}`;
  } catch (error) {
    console.error("Error parsing pricing:", error);
    return "Contact us";
  }
};

function ServicesSection() {
  // Fetch all services
  const { data: allServices = [], isLoading } = useQuery({
    queryKey: ["services", "all"],
    queryFn: () => fetchAllServices(null, 1, 50), // Get more services to ensure we have all categories
    staleTime: 5 * 60 * 1000,
  });

  // Group services by actual category names from your database
  const getCheapestByCategory = () => {
    const categoryMappings = [
      {
        key: "visa",
        title: "Visa",
        description:
          "PT Infinity Legal offers a complete range of visa services to support your business, travel, or investment plans in Indonesia. As an official legal partner, we're here to help you with Single Entry Visas, Visitor Visas, and Multiple Entry Visas, all while ensuring full compliance with Indonesian immigration laws. Our experienced team is ready to guide you in choosing the right visa, preparing the necessary documents, and handling the application process whether through the electronic system (e-Visa) or the conventional route.",
        filter: (service) => service.category === "visa",
      },
      {
        key: "limited-stay-permit",
        title: "Limited Stay Permit",
        description:
          "PT Infinity Legal provides comprehensive Limited Stay Permit (KITAS) solutions. Our expert legal team assists with all types of KITAS, including Family KITAS, Digital Nomad Visa, Investor KITAS, Working KITAS, and Retirement KITAS. We ensure full compliance with Indonesia's immigration laws, while offering efficient processing tailored to your needs whether in Bali, or other key destinations. PT Infinity Legal simplifies your KITAS application with end to end professional support.",
        filter: (service) => service.category === "limited stay permit",
      },
      {
        key: "company-setup",
        title: "Company Setup",
        description:
          "PT Infinity Legal offers end-to-end solutions for Company Setup and business-related services in Indonesia. As an official legal partner, we help clients handle all legal aspects of their business from incorporation to dissolution ensuring full compliance with Indonesian regulations. Our expert team is here to support you with setting up a company PT PMA, Virtual Office services, LKPM reporting, Accounting & Tax services, and Company Dissolution. We understand the complexity of Indonesia's bureaucracy, so we focus on delivering a process that's efficient, transparent, and tailored to your business needs.",
        filter: (service) => service.category === "company set up",
      },
      {
        key: "legal-services",
        title: "Legal Services",
        description:
          "PT Infinity Legal provides comprehensive legal services to protect your business interests and ensure your company's legal compliance in Indonesia. As a trusted legal partner, we offer practical, tailored legal solutions for corporate clients and foreign investors always in line with Indonesian laws and regulations. Our experienced team is here to support you with Agreement Review & Drafting, Legal Consultation & Assistance, and Notarial Services. We make sure your documents and business transactions are legally sound, helping you safeguard company assets and reduce the risk of disputes.",
        filter: (service) => service.category === "legal services",
      },
    ];

    return categoryMappings.map((categoryMapping) => {
      const categoryServices = allServices.filter(categoryMapping.filter);

      if (categoryServices.length === 0) {
        // Fallback service for empty categories
        return {
          id: `${categoryMapping.key}-placeholder`,
          title: categoryMapping.title,
          description: categoryMapping.description,
          image:
            "https://jxtylpahapimibfnchjt.supabase.co/storage/v1/object/public/images/services/default.jpg",
          price: "Contact us",
          category: categoryMapping.key,
          slug: "contact",
        };
      }

      // Find the service with the lowest price
      let cheapestService = categoryServices[0];
      let lowestPrice = Infinity;

      categoryServices.forEach((service) => {
        try {
          const pricing =
            typeof service.price === "string"
              ? JSON.parse(service.price)
              : service.price;

          if (pricing.pricing_type === "consultation") {
            return;
          }

          let servicePrices = [];
          Object.entries(pricing.pricing || {}).forEach(([key, value]) => {
            if (key === "breakdown") return;

            if (typeof value === "object" && value !== null) {
              Object.entries(value).forEach(([serviceLevel, price]) => {
                if (serviceLevel !== "breakdown" && typeof price === "string") {
                  const numericPrice = price.replace(/[^\d]/g, "");
                  if (numericPrice) servicePrices.push(parseInt(numericPrice));
                }
              });
            } else if (typeof value === "string") {
              const numericPrice = value.replace(/[^\d]/g, "");
              if (numericPrice) servicePrices.push(parseInt(numericPrice));
            }
          });

          if (servicePrices.length > 0) {
            const minServicePrice = Math.min(...servicePrices);
            if (minServicePrice < lowestPrice) {
              lowestPrice = minServicePrice;
              cheapestService = service;
            }
          }
        } catch (error) {
          console.error("Error parsing service price:", error);
        }
      });

      // If all services in category are consultation-based, pick the first one
      if (lowestPrice === Infinity) {
        cheapestService = categoryServices[0];
      }

      return {
        ...cheapestService,
        title: categoryMapping.title, // Use category title
        description: categoryMapping.description, // Use category description
        price: getLowestPrice(cheapestService.price),
      };
    });
  };

  const featuredServices = getCheapestByCategory();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-10 items-center p-16 bg-neutral-50 max-sm:px-5 max-sm:py-10">
        <h2 className="text-3xl font-bold text-cyan-600">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-lg w-full h-[400px] flex flex-col">
                <div className="p-4">
                  <div className="bg-gray-200 rounded-2xl h-[180px] w-full"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="mt-auto">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-10 items-center p-16 bg-neutral-50 max-sm:px-5 max-sm:py-10">
      <h2 className="text-3xl font-bold text-cyan-600">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {featuredServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            image={service.image}
            title={service.title}
            description={service.description}
            price={service.price}
            slug={service.slug}
          />
        ))}
      </div>
      <div>
        <Link to={"/contact"}>
          <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer bg-[#1196A9] hover:bg-cyan-700 transition-colors">
            Contact us
          </button>
        </Link>
      </div>
    </section>
  );
}

export default ServicesSection;
