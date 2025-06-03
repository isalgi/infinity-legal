import Header from "./Header";
import hero from "../../assets/new-banner-hero.jpg";

function HeroSection() {
  return (
    <>
      <Header />
      <section
        className="flex relative items-center justify-start min-h-screen pl-24 max-md:px-10 max-sm:px-5"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-5 w-[577px] max-sm:w-full">
          <h1 className="text-4xl font-bold leading-10 text-white max-sm:text-3xl max-sm:leading-8">
            Expert Solutions for Business and Visa Needs in Indonesia
          </h1>
          <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer w-1/3 mt-5">
            Contact us
          </button>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
