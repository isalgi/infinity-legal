import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="flex overflow-hidden flex-col justify-center px-16 max-lg:px-12 max-md:px-8 max-sm:px-4 mt-16 max-lg:mt-12 max-md:mt-8 max-sm:mt-6 w-full rounded-3xl max-sm:rounded-2xl">
      <div className="overflow-hidden w-full rounded-3xl max-sm:rounded-2xl">
        <div className="flex relative justify-between items-start w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/58b32b0612d31961af0c279527f472377863b053?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1"
            className="object-cover z-0 w-full rounded-lg h-[347px] max-lg:h-[300px] max-md:h-[280px] max-sm:h-[240px]"
            alt="Contact hero background"
          />
          <div className="absolute mt-10 max-lg:mt-8 max-md:mt-6 max-sm:mt-4 top-5 max-sm:top-3 z-0 left-[50px] max-lg:left-[40px] max-md:left-[30px] max-sm:left-[20px] min-w-60 max-sm:min-w-40 w-[517px] max-lg:w-[450px] max-md:w-[350px] max-sm:w-[280px]">
            <h2 className="py-8 max-lg:py-6 max-md:py-4 max-sm:py-3 max-w-full text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg font-semibold leading-none text-white w-[345px] max-lg:w-[300px] max-md:w-[250px] max-sm:w-[200px]">
              We are here to help you
            </h2>
            <div className="flex flex-col mt-5 max-md:mt-4 max-sm:mt-3 w-full max-w-[467px] max-lg:max-w-[400px] max-md:max-w-[320px] max-sm:max-w-[260px]">
              <div className="flex flex-col w-full">
                <p className="gap-2.5 w-full text-base max-md:text-sm max-sm:text-xs font-medium leading-5 max-sm:leading-4 text-white">
                  Contact us below to getting know better about our product or
                  services
                </p>
                <div className="flex gap-10 max-md:gap-6 max-sm:gap-4 items-start self-start mt-10 max-md:mt-8 max-sm:mt-6 text-base max-md:text-sm max-sm:text-xs font-bold leading-snug text-center text-white">
                  <Link to="https://wa.me/6281239336293">
                    <button className="gap-2 self-stretch px-8 max-md:px-6 max-sm:px-4 py-3 max-md:py-2.5 max-sm:py-2 rounded-md border border-white border-solid min-h-[43px] max-md:min-h-[38px] max-sm:min-h-[34px] hover:bg-white hover:text-cyan-600 transition-colors duration-300">
                      WhatsApp us
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex gap-2.5 self-start mt-10 max-md:mt-8 max-sm:mt-6 min-h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
