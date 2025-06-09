// src/components/Home/ServiceCard.jsx
import { Link } from "react-router-dom";

function ServiceCard({ image, title, description, price, slug }) {
  return (
    <Link
      to={slug === "contact" ? "/contact" : `/services/${slug}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-[600px]"
    >
      {/* Image container */}
      <div className="p-4 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="rounded-2xl h-[180px] w-full object-cover"
        />
      </div>

      {/* Content container */}
      <div className="px-4 pb-6 flex flex-col flex-grow min-h-0">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#1196A9] mb-4 text-center flex-shrink-0">
          {title}
        </h3>

        {/* Description - Takes up available space */}
        <div className="flex-grow mb-6 overflow-hidden">
          <p className="text-sm text-gray-600 leading-relaxed h-full">
            {description}
          </p>
        </div>

        {/* Price section - Fixed at bottom with adequate spacing */}
        <div className="flex-shrink-0 mt-auto pt-4">
          <p className="text-xs text-gray-500 mb-2">Starting From</p>
          <p className="text-xl font-bold text-gray-900 mb-2">{price}</p>
          <p className="text-xs text-gray-500">All pricing exclude PPN</p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
