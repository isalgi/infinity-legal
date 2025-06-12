// src/components/Services/ServicesList.jsx - Streamlined version
import { useRef, useCallback, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllServices } from "../../services/supabase/serviceService";
import OptimizedImage from "../OptimizedImage";

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
    if (typeof pricingData === "string") {
      return pricingData;
    }
    return "Contact us";
  }
};

export default function ServicesList() {
  const loaderRef = useRef(null);
  const preloadInitiatedRef = useRef(false); // Prevent duplicate preloading
  const limit = 50;

  // Use useInfiniteQuery with enhanced caching
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["services", "paginated"],
      queryFn: ({ pageParam = 1 }) => fetchAllServices(null, pageParam, limit),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

  // Flatten all pages of data
  const services = data?.pages.flat() || [];

  // Memoize grouped services
  const groupedServices = useMemo(() => {
    return {
      visa: services.filter((service) => service.category === "visa"),
      permit: services.filter(
        (service) => service.category === "limited stay permit"
      ),
      company: services.filter(
        (service) => service.category === "company set up"
      ),
      legal: services.filter(
        (service) => service.category === "legal services"
      ),
    };
  }, [services]);

  // Simplified preloading - only via Service Worker
  useEffect(() => {
    if (services.length > 0 && !preloadInitiatedRef.current) {
      const imageUrls = services
        .map((service) => service.image)
        .filter(Boolean);

      if (imageUrls.length > 0) {
        // Only use Service Worker for preloading to avoid duplication
        if (
          "serviceWorker" in navigator &&
          navigator.serviceWorker.controller
        ) {
          console.log(
            `🔄 Preloading ${imageUrls.length} images via Service Worker...`
          );
          navigator.serviceWorker.controller.postMessage({
            type: "PRELOAD_IMAGES",
            urls: imageUrls,
          });
          preloadInitiatedRef.current = true;
        }
      }
    }
  }, [services]);

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
            console.log("📄 Loading next page...");
            fetchNextPage();
          }
        },
        {
          rootMargin: "200px",
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

  const renderServiceCard = (
    service,
    index,
    isLast = false,
    isEager = false
  ) => (
    <Link
      to={`/services/${service.slug}`}
      key={service.id}
      ref={isLast ? lastServiceRef : undefined}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
    >
      <div className="p-4">
        <OptimizedImage
          src={service.image}
          alt={service.title}
          className="rounded-2xl h-[180px] w-full object-cover"
          eager={isEager}
        />
      </div>

      <div className="px-4 pb-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-[#1196A9] mb-3 min-h-[50px] flex items-start">
          {service.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[60px]">
          {service.description}
        </p>

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
      <div className="container mx-auto px-24">
        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded text-xs">
            📊 Services loaded: {services.length} | Preload initiated:{" "}
            {preloadInitiatedRef.current ? "✅" : "⏳"}
          </div>
        )}

        {/* Visa Services Section */}
        {groupedServices.visa.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">Visa</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedServices.visa.map((service, index) =>
                renderServiceCard(service, index, false, index < 4)
              )}
            </div>
          </div>
        )}

        {/* Limited Stay Permit Services Section */}
        {groupedServices.permit.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">
                Limited Stay Permit
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedServices.permit.map((service, index) =>
                renderServiceCard(service, index, false, index < 4)
              )}
            </div>
          </div>
        )}

        {/* Company Set Up Services Section */}
        {groupedServices.company.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">
                Company Set Up
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedServices.company.map((service, index) =>
                renderServiceCard(service, index, false, false)
              )}
            </div>
          </div>
        )}

        {/* Legal Services Section */}
        {groupedServices.legal.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1196A9] mb-4">
                Legal Services
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedServices.legal.map((service, index) =>
                renderServiceCard(
                  service,
                  index,
                  index === groupedServices.legal.length - 1,
                  false
                )
              )}
            </div>
          </div>
        )}

        {/* Loading indicator */}
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
