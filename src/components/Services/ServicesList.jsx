// src/components/Services/ServicesList.jsx
import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllServices } from "../../services/supabase/serviceService";

export default function ServicesList() {
  const loaderRef = useRef(null);
  const limit = 8; // Items per page

  // Use useInfiniteQuery instead of useQuery for proper infinite scrolling
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
      className="bg-white py-16"
      style={{ height: "1000px", overflowY: "auto" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.id}
              ref={
                index === 3 && services.length <= 4 ? lastServiceRef : undefined
              }
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative group"
            >
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 ">
                <h3 className="text-lg text-center font-semibold mb-7 text-[#1196A9]">
                  {service.title
                    .toLowerCase()
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                    .replace(/\b\w/, (l) => l.toUpperCase())}
                </h3>
                <p className="text-gray-600 text-sm group-hover:line-clamp-1 line-clamp-3 transition-all duration-300">
                  {service.description}
                </p>

                {/* Price info that shows on hover */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
