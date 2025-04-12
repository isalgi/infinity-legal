import StarRating from "./StarRating";

function ReviewCard({ name, company, review, index }) {
  // Only apply border and padding to the middle (index 1) card
  const isMiddleCard = index === 1;

  return (
    <article
      className={`flex flex-col items-center w-[324px] ${
        isMiddleCard ? "border-l border-r border-gray-200 px-14 w-[448px]" : ""
      } max-md:border-r-0 max-md:border-l-0 max-md:border-b max-md:border-gray-200 max-md:pb-10 max-md:last:border-b-0`}
    >
      <StarRating />
      <h3 className="text-xl font-semibold text-cyan-600 mb-2">{name}</h3>
      <div className="text-xl mt-2">{company}</div>
      <p className="text-sm leading-6 text-center text-gray-700 mt-4">
        {review}
      </p>
    </article>
  );
}

export default ReviewCard;
