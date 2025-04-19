import { Link } from "react-router-dom";

function ArticleCard({ image, title, date, slug }) {
  return (
    <article className="flex flex-col flex-1 gap-2.5 items-start min-w-[300px]">
      <Link to={`/news/${slug}`}>
        <img
          src={image}
          alt="Article"
          className="w-[396px] h-[250px] rounded-[25px] object-cover"
        />
      </Link>
      <h3 className="text-2xl font-medium text-black">{title}</h3>
      <div className="flex flex-col justify-end flex-1">
        <time className="text-base text-black">{date}</time>
      </div>
    </article>
  );
}

export default ArticleCard;
