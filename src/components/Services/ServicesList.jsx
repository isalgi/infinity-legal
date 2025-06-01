// src/components/Services/ServicesList.jsx
import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllServices } from "../../services/supabase/serviceService";

export default function ServicesList() {
  const loaderRef = useRef(null);
  const limit = 8; // Items per page

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

  return (
    <section
      className="bg-[#FAFAFA] py-10"
      style={{ height: "1150px", overflowY: "auto" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.id}
              ref={index === services.length - 1 ? lastServiceRef : undefined}
              className="bg-white rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden hover:shadow-xl transition-all duration-300 relative group w-[300px] max-sm:w-full"
              style={{ height: "auto", minHeight: "450px" }}
            >
              {/* Image container with fixed height */}
              <div className="px-5 pt-4 flex justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-3xl h-[200px] w-[270px] object-cover"
                />
              </div>

              {/* Title with fixed height */}
              <div className="px-5 mt-6 mb-3 h-[60px] flex items-center justify-center">
                <h3 className="text-xl font-semibold text-center text-cyan-600">
                  {service.title.includes(" ")
                    ? service.title
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())
                        .replace(/\b\w/, (l) => l.toUpperCase())
                    : service.title}
                </h3>
              </div>

              {/* Description with fixed height */}
              <div className="px-5 mt-2">
                <p className="text-base leading-5 text-black group-hover:line-clamp-2 line-clamp-5 transition-all duration-300 min-h-[80px] max-h-[120px]">
                  {service.description}
                </p>
              </div>

              {/* Price section with fixed position */}
              <div className="px-5 pb-5 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-0">
                <p className="text-xs text-gray-700 mb-0">Starting From</p>
                <p className="text-black text-2xl font-semibold mt-1">
                  {typeof service.price === "number"
                    ? service.price.toLocaleString()
                    : service.price}
                </p>
                <p className="text-sm text-gray-800 mt-1">
                  All pricing exclude PPN
                </p>
              </div>
            </Link>
          ))}
        </div>

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
    </section>
  );
}
