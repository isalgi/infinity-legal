import StarRating from "./StarRating";

function ReviewCard({ name, company, review }) {
  return (
    <article className="flex flex-col gap-5 items-center max-w-[324px]">
      <StarRating />
      <h3 className="text-2xl font-semibold text-cyan-600">{name}</h3>
      <div className="text-2xl text-black">{company}</div>
      <p className="text-xl leading-8 text-center text-neutral-700">{review}</p>
    </article>
  );
}

export default ReviewCard;
