function VisaCard({ imageSrc, title, description, hasPricing = false, price }) {
  return (
    <article className="flex gap-10 items-center self-stretch my-auto min-w-60 w-[300px]">
      <div className="flex gap-10 items-start self-stretch my-auto min-w-60 w-[300px]">
        <div className="flex overflow-hidden flex-col px-2.5 pt-4 pb-11 bg-white rounded-3xl min-h-[579px] min-w-60 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[300px]">
          <img
            src={imageSrc}
            alt={title}
            className="object-contain w-full rounded-3xl aspect-[1.08] min-h-[251px]"
          />
          <h3 className="mt-8 text-xl font-semibold leading-none text-center text-cyan-600">
            {title}
          </h3>

          <p
            className={`mt-8 text-base leading-5 text-black ${
              hasPricing ? "flex-1 shrink px-1.5 basis-0" : ""
            }`}
          >
            {description}
          </p>

          {hasPricing && (
            <div className="px-1.5 mt-8 w-full">
              <p className="text-sm">Starting From</p>
              <p className="mt-1.5 text-2xl font-semibold">{price}</p>
              <p className="mt-1.5 text-sm">All pricing exclude PPN</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default VisaCard;
