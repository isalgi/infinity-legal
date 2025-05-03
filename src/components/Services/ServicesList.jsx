// src/components/Services/ServicesList.jsx
import { useState, useEffect, useRef, useCallback } from "react";
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
      style={{ height: "800px", overflowY: "auto" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.id}
              ref={index === services.length - 1 ? lastServiceRef : undefined}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Price overlay that appears on hover */}
                <div className="absolute bottom-0 left-0 w-full bg-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">
                        Starting from
                      </span>
                      <div className="text-cyan-600 font-semibold">
                        {service.price}
                      </div>
                      <span className="text-xs text-gray-400">
                        *all prices include PPN
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="text-cyan-600"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                  </div>
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
