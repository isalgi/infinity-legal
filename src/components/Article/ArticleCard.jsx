import React from "react";

function ArticleCard({ image, title, date }) {
  return (
    <article className="flex flex-col flex-1 gap-2.5 items-start min-w-[300px] cursor-pointer">
      <img
        src={image}
        alt="Article"
        className="w-full h-[307px] rounded-[25px] object-cover"
      />
      <h3 className="text-2xl font-medium text-black">{title}</h3>
      <time className="text-base text-black">{date}</time>
    </article>
  );
}

export default ArticleCard;
