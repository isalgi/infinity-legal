import Header from "./Header";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <Header />
      <section className="flex relative items-center justify-start min-h-screen pl-24 max-md:px-10 max-sm:px-5 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>

        {/* Content */}
        <div className="flex flex-col gap-5 w-[577px] max-sm:w-full relative z-20">
          <h1 className="text-4xl font-bold leading-10 text-white max-sm:text-3xl max-sm:leading-8">
            Expert Solutions for Business and Visa Needs in Indonesia
          </h1>
          <Link to={"/contact"}>
            <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer w-fit mt-5 hover:bg-white hover:text-gray-800 transition-colors">
              Contact us
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
