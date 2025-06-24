// src/components/Services/ServicesList.jsx
import { useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllServices } from "../../services/supabase/serviceService";

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
            // Extract numeric value from price string like "IDR 1,500,000"
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
    // Fallback to old pricing format
    if (typeof pricingData === "string") {
      return pricingData;
    }
    return "Contact us";
  }
};

export default function ServicesList() {
  const loaderRef = useRef(null);
  const limit = 50; // Increase limit to get more services for grouping

  // Use useInfiniteQuery for proper infinite scrolling
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["services", "paginated"],
      queryFn: ({ pageParam = 1 }) => fetchAllServices(null, pageParam, limit),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

  // Flatten all pages of data
  const services = data?.pages.flat() || [];

  // Setup intersection observer for infinite scroll
  const lastServiceRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (loaderRef.current) loaderRef.current.disconnect();

      loaderRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasNextPage &&
            !isLoading &&
            !isFetchingNextPage
          ) {
            console.log("Loading next page");
            fetchNextPage();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1,
        }
      );

      if (node) loaderRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isFetchingNextPage]
  );

  // Handle hash navigation and smooth scrolling
  useEffect(() => {
    const handleHashNavigation = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100); // Small delay to ensure the page is rendered
        }
      }
    };

    // Handle initial load with hash
    if (services.length > 0) {
      handleHashNavigation();
    }

    // Handle hash changes
    const handleHashChange = () => {
      handleHashNavigation();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [services]); // Re-run when services data changes

  if (isLoading && services.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <div className="text-cyan-600 text-xl">Loading services...</div>
      </div>
    );
  }

  // Group services by category in the desired order
  const visaServices = services.filter(
    (service) => service.category === "visa"
  );
  const permitServices = services.filter(
    (service) => service.category === "limited stay permit"
  );
  const companyServices = services.filter(
    (service) => service.category === "company set up"
  );
  const legalServices = services.filter(
    (service) => service.category === "legal services"
  );

  const renderServiceCard = (service, index, isLast = false) => (
    <Link
      to={`/services/${service.slug}`}
      key={service.id}
      ref={isLast ? lastServiceRef : undefined}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      {/* Image container */}
      <div className="p-4 max-sm:p-3">
        <img
          src={service.image}
          alt={service.title}
          className="rounded-2xl h-[180px] max-md:h-[160px] max-sm:h-[140px] w-full object-cover"
        />
      </div>

      {/* Content container */}
      <div className="px-4 pb-4 max-sm:px-3 max-sm:pb-3 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold text-[#1196A9] mb-3 max-sm:mb-2 min-h-[50px] max-md:min-h-[45px] max-sm:min-h-[40px] flex items-start">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm max-sm:text-xs text-gray-600 mb-4 max-sm:mb-3 line-clamp-3 min-h-[60px] max-md:min-h-[55px] max-sm:min-h-[45px]">
          {service.description}
        </p>

        {/* Price section */}
        <div className="mt-auto">
          <p className="text-xs max-sm:text-[10px] text-gray-500 mb-1">
            Starting From
          </p>
          <p className="text-xl max-md:text-lg max-sm:text-base font-bold text-gray-900">
            {getLowestPrice(service.price)}
          </p>
          <p className="text-xs max-sm:text-[10px] text-gray-500 mt-1">
            All pricing include PPN
          </p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="bg-gray-50 py-12 max-md:py-8 max-sm:py-6">
      <div className="container mx-auto px-24 max-lg:px-16 max-md:px-8 max-sm:px-4">
        {/* Visa Services Section */}
        {visaServices.length > 0 && (
          <div
            id="visa-services"
            className="mb-16 max-md:mb-12 max-sm:mb-8 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="mb-8 max-md:mb-6 max-sm:mb-4">
              <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#1196A9] mb-4 max-sm:mb-2">
                Visa
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4 max-sm:gap-3">
              {visaServices.map((service, index) =>
                renderServiceCard(service, index, false)
              )}
            </div>
          </div>
        )}

        {/* Limited Stay Permit Services Section */}
        {permitServices.length > 0 && (
          <div
            id="permit-services"
            className="mb-16 max-md:mb-12 max-sm:mb-8 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="mb-8 max-md:mb-6 max-sm:mb-4">
              <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#1196A9] mb-4 max-sm:mb-2">
                Limited Stay Permit
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4 max-sm:gap-3">
              {permitServices.map((service, index) =>
                renderServiceCard(service, index, false)
              )}
            </div>
          </div>
        )}

        {/* Company Set Up Services Section */}
        {companyServices.length > 0 && (
          <div
            id="company-services"
            className="mb-16 max-md:mb-12 max-sm:mb-8 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="mb-8 max-md:mb-6 max-sm:mb-4">
              <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#1196A9] mb-4 max-sm:mb-2">
                Company Set Up
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4 max-sm:gap-3">
              {companyServices.map((service, index) =>
                renderServiceCard(service, index, false)
              )}
            </div>
          </div>
        )}

        {/* Business Services Section */}
        {legalServices.length > 0 && (
          <div
            id="legal-services"
            className="mb-16 max-md:mb-12 max-sm:mb-8 scroll-mt-32"
          >
            {/* Category Header */}
            <div className="mb-8 max-md:mb-6 max-sm:mb-4">
              <h2 className="text-3xl max-md:text-2xl max-sm:text-xl font-bold text-[#1196A9] mb-4 max-sm:mb-2">
                Legal Services
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4 max-sm:gap-3">
              {legalServices.map((service, index) =>
                renderServiceCard(
                  service,
                  index,
                  index === legalServices.length - 1 // Last service for infinite scroll
                )
              )}
            </div>
          </div>
        )}

        {(isLoading || isFetchingNextPage) && (
          <div className="text-center mt-8 max-sm:mt-6">
            <div className="text-cyan-600 max-sm:text-sm">
              Loading more services...
            </div>
          </div>
        )}

        {/* Loader element at bottom of list */}
        <div
          ref={hasNextPage ? lastServiceRef : undefined}
          className="h-10 w-full"
        ></div>
      </div>

      {/* Add CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
