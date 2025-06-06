// src/components/Home/ServiceCard.jsx
import { Link } from "react-router-dom";

function ServiceCard({ image, title, description, price, slug }) {
  return (
    <Link
      to={slug === "contact" ? "/contact" : `/services/${slug}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-[500px]"
    >
      {/* Image container */}
      <div className="p-4">
        <img
          src={image}
          alt={title}
          className="rounded-2xl h-[180px] w-full object-cover"
        />
      </div>

      {/* Content container */}
      <div className="px-4 pb-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-[#1196A9] mb-3 text-center">
          {title}
        </h3>

        {/* Description - Fixed height container */}
        <div className="flex-grow mb-4">
          <p
            className="text-sm text-gray-600 text-justify leading-relaxed overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 6,
              WebkitBoxOrient: "vertical",
              height: "9rem", // Fixed height for 6 lines
              lineHeight: "1.5rem",
            }}
          >
            {description}
          </p>
        </div>

        {/* Price section - Always at bottom */}
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-1">Starting From</p>
          <p className="text-xl font-bold text-gray-900">{price}</p>
          <p className="text-xs text-gray-500 mt-1">All pricing exclude PPN</p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
