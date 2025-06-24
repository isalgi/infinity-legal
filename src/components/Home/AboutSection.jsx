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
        <source src="/videos/about-section.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>

      {/* Content */}
      <div className="flex flex-col gap-5 max-w-[1264px] relative z-20">
        <h2 className="text-3xl font-semibold text-white">About us</h2>
        <p className="text-base font-medium leading-5 text-white mt-5">
          Infinity Legal is a professional legal and visa consultancy based in
          Bali, Indonesia.
          <br />
          <br />
          Our team is composed of experienced lawyers and legal professionals
          who understand both the Indonesian legal landscape and the needs of
          international and local clients.
          <br />
          <br />
          We offer a full range of services — from visa processing and company
          formation (including PMA / foreign investment companies) to legal
          advisory, contract drafting, and corporate compliance.
          <br />
          <br />
          We take pride in delivering clear, practical advice and efficient
          solutions, while upholding the highest standards of confidentiality
          and professionalism.
          <br />
          <br />
          Our mission is to simplify the complexities of legal and regulatory
          processes in Indonesia — so you can focus on what matters most.
          Whether you are an individual, expatriate, entrepreneur, or
          corporation, we are your trusted partner in navigating Indonesia’s
          legal landscape with ease.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
