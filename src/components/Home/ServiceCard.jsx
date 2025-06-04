// src/components/Home/ServiceCard.jsx
import { Link } from "react-router-dom";

function ServiceCard({ image, title, description, price, slug }) {
  return (
    <Link
      to={slug === "contact" ? "/contact" : `/services/${slug}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col w-[270px] max-sm:w-full"
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
        <h3 className="text-lg font-semibold text-[#1196A9] mb-3 min-h-[50px] flex items-start">
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-600 mb-4 flex-grow overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            maxHeight: "4.5rem",
            lineHeight: "1.5rem",
          }}
        >
          {description}
        </p>

        {/* Price section */}
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
