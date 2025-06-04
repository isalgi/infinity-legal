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
        filter: (service) => service.category === "visa",
      },
      {
        key: "limited-stay-permit",
        title: "Limited Stay Permit",
        filter: (service) => service.category === "limited stay permit",
      },
      {
        key: "company-setup",
        title: "Company Setup",
        filter: (service) => service.category === "company set up",
      },
      {
        key: "legal-services",
        title: "Legal Services",
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
          description:
            "Professional services tailored to your needs. Contact us for detailed information and personalized consultation.",
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
            // For consultation services, we'll pick one but it won't be "cheapest"
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
        title: categoryMapping.title, // Use category title instead of service title
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
        <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer bg-[#1196A9] hover:bg-cyan-700 transition-colors">
          Contact us
        </button>
      </div>
    </section>
  );
}

export default ServicesSection;
