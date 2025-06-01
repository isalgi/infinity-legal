// src/components/Services/ServicesList.jsx
import { useRef, useCallback } from "react";
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
  const kitasServices = services.filter(
    (service) => service.category === "kitas"
  );
  const businessServices = services.filter(
    (service) => service.category === "business"
  );

  const renderServiceCard = (service, index, isLast = false) => (
    <Link
      to={`/services/${service.slug}`}
      key={service.id}
      ref={isLast ? lastServiceRef : undefined}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      {/* Image container */}
      <div className="p-4">
        <img
          src={service.image}
          alt={service.title}
          className="rounded-2xl h-[180px] w-full object-cover"
        />
      </div>

      {/* Content container */}
      <div className="px-4 pb-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#1196A9] mb-3 min-h-[50px] flex items-center">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
          {service.description}
        </p>

        {/* Price section */}
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-1">Starting From</p>
          <p className="text-xl font-bold text-gray-900">
            {getLowestPrice(service.price)}
          </p>
          <p className="text-xs text-gray-500 mt-1">All pricing exclude PPN</p>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Visa Services Section */}
        {visaServices.length > 0 && (
          <div className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">Visa</h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visaServices.map((service, index) =>
                renderServiceCard(service, index, false)
              )}
            </div>
          </div>
        )}

        {/* KITAS Services Section */}
        {kitasServices.length > 0 && (
          <div className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">KITAS</h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kitasServices.map((service, index) =>
                renderServiceCard(service, index, false)
              )}
            </div>
          </div>
        )}

        {/* Business Services Section */}
        {businessServices.length > 0 && (
          <div className="mb-16">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">
                Business
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {businessServices.map((service, index) =>
                renderServiceCard(
                  service,
                  index,
                  index === businessServices.length - 1 // Last service for infinite scroll
                )
              )}
            </div>
          </div>
        )}

        {(isLoading || isFetchingNextPage) && (
          <div className="text-center mt-8">
            <div className="text-cyan-600">Loading more services...</div>
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
