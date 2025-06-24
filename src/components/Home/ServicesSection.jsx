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
          "Infinity Legal helps you obtain the right visa for your business, travel, or investment needs in Indonesia — including Single Entry, Visitor, and Multiple Entry Visas. We ensure full compliance and handle the process from start to finish.",
        filter: (service) => service.category === "visa",
      },
      {
        key: "limited-stay-permit",
        title: "Limited Stay Permit (KITAS)",
        description:
          "Infinity Legal provides full support for all types of KITAS — Family, Digital Nomad, Investor, Work, and Retirement. We ensure compliance and a smooth application process, tailored to your needs in Bali or elsewhere.",
        filter: (service) => service.category === "limited stay permit",
      },
      {
        key: "company-setup",
        title: "Company Setup",
        description:
          "Infinity Legal offers end-to-end services for setting up your company in Indonesia — from PMA registration, Virtual Office, and LKPM reporting to Accounting, Tax, and Company Dissolution. We simplify the process so you can focus on your business.",
        filter: (service) => service.category === "company set up",
      },
      {
        key: "legal-services",
        title: "Legal Services",
        description:
          "Infinity Legal provides practical legal services — including lawyer representation, contract drafting, legal consultation, corporate compliance, and notarial services. We help protect your interests and ensure your business stays fully compliant with Indonesian law.",
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

      // Override price for Company Setup category
      let finalPrice;
      if (categoryMapping.key === "company-setup") {
        finalPrice = "IDR 25,000,000";
      } else {
        finalPrice = getLowestPrice(cheapestService.price);
      }

      return {
        ...cheapestService,
        title: categoryMapping.title, // Use category title
        description: categoryMapping.description, // Use category description
        price: finalPrice,
      };
    });
  };

  const featuredServices = getCheapestByCategory();

  if (isLoading) {
    return (
      <section className="flex flex-col gap-10 items-center px-16 py-32 bg-neutral-50 max-sm:px-5 max-sm:py-32">
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
    <section className="flex flex-col gap-10 items-center px-16 py-32 bg-neutral-50 max-sm:px-5 max-sm:py-32">
      <h2 className="text-3xl font-bold text-cyan-600">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
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
    </section>
  );
}

export default ServicesSection;
