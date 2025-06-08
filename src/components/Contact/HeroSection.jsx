function HeroSection() {
  return (
    <div className="flex overflow-hidden flex-col justify-center px-16 mt-16 w-full rounded-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="overflow-hidden w-full rounded-3xl max-md:max-w-full">
        <div className="flex relative justify-between items-start w-full max-md:max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/58b32b0612d31961af0c279527f472377863b053?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1"
            className="object-contain z-0 flex-1 shrink gap-2.5 w-full rounded-lg aspect-[3.79] basis-0 min-h-[347px] min-w-60 max-md:max-w-full"
            alt="Contact hero background"
          />
          <div className="absolute mt-10 top-5 z-0 left-[50px] min-w-60 w-[517px] max-md:max-w-full">
            <h2 className="py-8 max-w-full text-3xl font-semibold leading-none text-white w-[345px]">
              We are here to help you
            </h2>
            <div className="flex flex-col mt-5 w-full max-w-[467px] max-md:max-w-full">
              <div className="flex flex-col w-full max-md:max-w-full">
                <p className="gap-2.5 w-full text-base font-medium leading-5 text-white max-md:max-w-full">
                  Contact us below to getting know better about our product or
                  services
                </p>
                <div className="flex gap-10 items-start self-start mt-10 text-base font-bold leading-snug text-center text-white">
                  <button className="gap-2 self-stretch px-8 py-3 rounded-md border border-white border-solid min-h-[43px] max-md:px-5">
                    Contact us
                  </button>
                </div>
              </div>
              <div className="flex gap-2.5 self-start mt-10 min-h-5 max-md:max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
