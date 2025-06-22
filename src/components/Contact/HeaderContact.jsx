import { useState } from "react";
import { Link } from "react-router-dom";
import infinityLogo from "../../assets/infinity-logo.png";

function HeaderContact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white w-full z-[100] shadow-sm">
      <div className="flex justify-between items-center px-20 py-2.5 h-[120px] max-md:px-10 max-md:py-2.5 max-sm:px-5 max-sm:py-2.5 max-sm:h-20">
        <div>
          <img
            src={infinityLogo}
            className="h-[72px] w-[76px] bg-white rounded-lg max-sm:h-12 max-sm:w-12"
            alt="INFINITY LEGAL"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="flex gap-14 items-center max-md:hidden">
          <Link to={"/"}>
            <p className="text-base font-bold text-black cursor-pointer hover:underline">
              Home
            </p>
          </Link>
          <Link to={"/services"}>
            <p className="text-base font-bold cursor-pointer hover:underline">
              Services
            </p>
          </Link>
          <Link to="/#about">
            <p className="text-base font-bold text-black cursor-pointer hover:underline">
              About
            </p>
          </Link>
          <Link to={"/news"}>
            <p className="text-base font-bold cursor-pointer hover:underline">
              News
            </p>
          </Link>
          <Link to={"/contact"}>
            <p className="text-base font-bold text-[#1196A9] cursor-pointer hover:underline">
              Contact
            </p>
          </Link>
          <Link to="https://wa.me/6281239336293">
            <p className="px-8 py-3 text-base font-bold text-white bg-cyan-500 rounded-xl cursor-pointer border-[none] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-cyan-600 transition-colors">
              WhatsApp us
            </p>
          </Link>
        </nav>

        {/* Mobile/Tablet Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        >
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      <div
        className={`md:hidden bg-white shadow-lg border-t transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col space-y-4 p-6">
          <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
            <p className="text-base font-bold text-black cursor-pointer hover:text-cyan-600 transition-colors">
              Home
            </p>
          </Link>
          <Link to={"/services"} onClick={() => setIsMenuOpen(false)}>
            <p className="text-base font-bold text-black cursor-pointer hover:text-cyan-600 transition-colors">
              Services
            </p>
          </Link>
          <Link to="/#about" onClick={() => setIsMenuOpen(false)}>
            <p className="text-base font-bold text-black cursor-pointer hover:text-cyan-600 transition-colors">
              About
            </p>
          </Link>
          <Link to={"/news"} onClick={() => setIsMenuOpen(false)}>
            <p className="text-base font-bold text-black cursor-pointer hover:text-cyan-600 transition-colors">
              News
            </p>
          </Link>
          <Link to={"/contact"} onClick={() => setIsMenuOpen(false)}>
            <p className="text-base font-bold text-[#1196A9] cursor-pointer hover:text-cyan-600 transition-colors">
              Contact
            </p>
          </Link>
          <Link
            to="https://wa.me/6281239336293"
            onClick={() => setIsMenuOpen(false)}
          >
            <button className="px-6 py-2 text-sm font-bold text-white bg-cyan-500 rounded-xl cursor-pointer border-none shadow-lg hover:bg-cyan-600 transition-colors w-fit">
              WhatsApp us
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default HeaderContact;
