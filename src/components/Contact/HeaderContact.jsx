import { Link } from "react-router-dom";
import infinityLogo from "../../assets/infinity-logo.png";

function HeaderContact() {
  return (
    <header className="flex justify-between items-center px-20 py-2.5 w-full h-[120px] z-[100] max-md:px-10 max-md:py-2.5 max-sm:px-5 max-sm:py-2.5 max-sm:h-20">
      <div>
        <img
          src={infinityLogo}
          className="h-[72px] w-[76px] bg-white rounded-lg"
          alt="INFINITY LEGAL"
        />
      </div>
      <nav className="flex gap-14 items-center max-sm:hidden">
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
        <Link to="https://wa.me/6282131907575">
          <p className="px-8 py-3 text-base font-bold text-white bg-cyan-500 rounded-xl cursor-pointer border-[none] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-cyan-600 transition-colors">
            Whatsapp Kami
          </p>
        </Link>
      </nav>
    </header>
  );
}

export default HeaderContact;
