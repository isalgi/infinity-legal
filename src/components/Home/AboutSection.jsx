import { Link } from "react-router-dom";

function AboutSection() {
  return (
    <section className="flex flex-col justify-center items-center px-20 py-0 w-full min-h-screen max-sm:px-5 max-sm:py-16 overflow-hidden relative">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://jxtylpahapimibfnchjt.supabase.co/storage/v1/object/public/videos//about-section%20(1).mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>

      {/* Content */}
      <div className="flex flex-col gap-5 max-w-[1264px] relative z-20">
        <h2 className="text-3xl font-semibold text-white">About us</h2>
        <p className="text-base font-medium leading-5 text-white mt-5">
          PT Infinity Legal is a trusted corporate law firm based in Bali. We
          specialize in visa services and business law for both local and
          international clients. Backed by an experienced legal team, we offer
          integrated and practical solutions from visa and limited stay permit
          processing to company formation and a wide range of corporate legal
          services helping you stay compliant and invest with confidence in
          Indonesia.
        </p>
        <div className="flex justify-between items-center mt-5">
          <Link to={"/contact"}>
            <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer">
              Contact us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
