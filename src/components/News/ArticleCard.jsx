import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ image, title, date, slug }) {
  return (
    <Link to={`/news/${slug}`}>
      <article className="flex flex-col flex-1 gap-2.5 items-start min-w-[300px] cursor-pointer">
        <img
          src={image}
          alt="Article"
          className="w-[396px] h-auto rounded-[25px] object-cover"
        />
        <h3 className="text-xl font-medium text-black">{title}</h3>
        <time className="text-base text-black">{date}</time>
      </article>
    </Link>
  );
}

export default ArticleCard;
