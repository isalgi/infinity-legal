// src/components/News/ArticleCard.jsx
import { Link } from "react-router-dom";

function ArticleCard({ image, title, date, slug }) {
  return (
    <article className="flex flex-col flex-1 gap-2.5 items-start">
      <Link to={`/news/${slug}`} className="w-full">
        <div className="w-full aspect-[16/9] overflow-hidden rounded-[25px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h3 className="mt-2 text-2xl font-medium text-black">{title}</h3>
      </Link>
      <div className="flex flex-col justify-end flex-1">
        <time className="text-base text-black">{date}</time>
      </div>
    </article>
  );
}

export default ArticleCard;
