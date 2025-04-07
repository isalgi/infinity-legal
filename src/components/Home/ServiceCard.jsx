function ServiceCard({ image, title, description }) {
  return (
    <article className="flex flex-col gap-8 items-center px-2.5 pt-4 pb-8 bg-white rounded-3xl h-[579px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[300px] max-sm:w-full">
      <img
        src={image}
        className="rounded-3xl h-[251px] w-[270px]"
        alt={title}
      />
      <h3 className="text-xl font-semibold text-center text-cyan-600">
        {title}
      </h3>
      <p className="text-base leading-5 text-black w-[260px]">{description}</p>
    </article>
  );
}

export default ServiceCard;
