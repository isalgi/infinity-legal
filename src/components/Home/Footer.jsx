import icon1 from "../../assets/whatsapp.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleServiceNavigation = (sectionId) => {
    if (location.pathname === "/services") {
      // If already on services page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Update URL hash without causing page reload
      window.history.pushState(null, null, `#${sectionId}`);
    } else {
      // If on different page, navigate to services with hash
      navigate(`/services#${sectionId}`);
    }
  };

  return (
    <footer className="px-20 pt-16 pb-10 bg-sky-50 max-md:px-5 max-md:py-10">
      <div className="flex justify-between mb-20 max-md:flex-col max-md:gap-10">
        <div className="flex flex-col gap-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/58c575e76d13a1fd2ff022656a1e57f19aa443c7?placeholderIfAbsent=true"
            className="h-[86px] w-[120px]"
            alt="INFINITY LEGAL"
          />
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-2 pl-16 max-md:pl-0">
            <h3 className="text-xl font-semibold text-cyan-600">
              Office Address
            </h3>
            <p className="text-sm text-black">
              Bypass Road, Tanah Lot Street No. 888x, Munggu, <br />
              Badung Regency, Bali Province 80351
              <br />
              <br />
              Business Hours
              <br />
              Opening Hours: Monday to Saturday, 9:00 AM – 6:00 PM <br />
              (Central Indonesian Time)
              <br />
              Closed on Sunday
            </p>
            {/* <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c8ed2f5ea52842c3a77de52ecea8df06e8d2d34?placeholderIfAbsent=true"
              className="h-[44.5px] w-[31.5px]"
              alt="Location icon"
            /> */}
          </div>
          <div className="flex flex-col gap-2 pl-16 max-md:pl-0">
            <Link to={"/contact"}>
              <h3 className="text-xl font-semibold text-cyan-600">
                Contact us
              </h3>
            </Link>
            <p className="text-sm text-black">
              Email: infinitylegalco@gmail.com
              <br />
              WhatsApp: +6282139336293
              <br />
              Instagram: infinitylegal.co
            </p>
            {/* <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/536586b7c4fe73f09e464acc5b0f83868388fdad?placeholderIfAbsent=true"
              className="h-[44.5px] w-[31.5px]"
              alt="Contact icon"
            /> */}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl text-cyan-600">Services</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleServiceNavigation("visa-services")}
              className="text-sm text-black hover:text-cyan-600 transition-colors duration-200 text-left cursor-pointer"
            >
              Visa
            </button>
            <button
              onClick={() => handleServiceNavigation("permit-services")}
              className="text-sm text-black hover:text-cyan-600 transition-colors duration-200 text-left cursor-pointer"
            >
              Limited Stay Permit
            </button>
            <button
              onClick={() => handleServiceNavigation("company-services")}
              className="text-sm text-black hover:text-cyan-600 transition-colors duration-200 text-left cursor-pointer"
            >
              Company Setup
            </button>
            <button
              onClick={() => handleServiceNavigation("legal-services")}
              className="text-sm text-black hover:text-cyan-600 transition-colors duration-200 text-left cursor-pointer"
            >
              Legal Services
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl text-cyan-600">Legal</h3>
          <div className="flex flex-col gap-2">
            <a className="text-sm text-black">Privacy Policy</a>
            <a className="text-sm text-black">Terms and Conditions</a>
          </div>
        </div>
      </div>
      <p className="text-xs font-medium text-center text-cyan-600">
        Copyright 2025 – Infinity Legal Indonesia
      </p>
    </footer>
  );
}

export default Footer;
