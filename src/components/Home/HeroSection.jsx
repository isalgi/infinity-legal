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

        {/* Content Container with Glassmorphism Effect */}
        <div className="relative z-20 backdrop-blur-md bg-[#1196A9]/10 border border-white/20 rounded-2xl p-8 max-sm:p-6 shadow-xl">
          <div className="flex flex-col gap-6 w-[577px] max-sm:w-full">
            <h1
              className="text-[20px] leading-10 max-sm:text-3xl max-sm:leading-8 text-[#F0C310] font-medium"
              style={
                {
                  // textShadow:
                  //   "-0.5px 0 black, 0 0.5px black, 0.5px 0 black, 0 -0.5px black",
                }
              }
            >
              Professional Visa & Corporate Attorneys in Indonesia
            </h1>
            <h1 className="text-[36px] font-bold leading-10 text-white max-sm:text-3xl max-sm:leading-8">
              Infinity Legal Indonesia
            </h1>
            <h1 className="text-[16px] text-white max-sm:text-3xl max-sm:leading-8">
              Expert Solutions for Business and Visa Needs in Indonesia
            </h1>
            <h1 className="text-[16] leading-10 text-white max-sm:text-3xl max-sm:leading-8">
              Free Consultation!
            </h1>
            <Link to={"/#contact"}>
              <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer w-fit mt-7 hover:bg-white hover:text-gray-800 transition-colors">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
