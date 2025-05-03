// src/components/Services/ServicesList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAllServices } from "../../services/supabase/serviceService";

export default function ServicesList() {
  const [activeCategory, setActiveCategory] = useState("visa");

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services", activeCategory],
    queryFn: () => fetchAllServices(activeCategory),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const categories = [
    { id: "visa", label: "Visa" },
    { id: "legal", label: "Legal" },
    { id: "business", label: "Business" },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        Loading services...
      </div>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              to={`/services/${service.slug}`}
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
                <div className="flex justify-between items-center">
                  <span className="text-cyan-600 font-medium">
                    {service.price}
                  </span>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
