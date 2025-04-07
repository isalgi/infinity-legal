import ReviewCard from "./ReviewCard";

function ReviewsSection() {
  const reviews = [
    {
      name: "John Doe",
      company: "PT. LEBAH MADU",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur",
    },
    {
      name: "Rudi Tsu",
      company: "PT. TERNAK LEBAH",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur",
    },
    {
      name: "Wong Fei Hong",
      company: "PT. ELANG MENDARAT",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
    },
  ];

  return (
    <section className="px-0 py-10 bg-white ">
      <h2 className="mb-10 text-3xl font-bold text-center text-cyan-600">
        Our Reviews
      </h2>
      <div className="flex justify-center gap-20 px-32 py-0 max-md:flex-col max-md:gap-10 max-md:items-center max-sm:px-5 max-sm:py-0">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            company={review.company}
            review={review.review}
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewsSection;
