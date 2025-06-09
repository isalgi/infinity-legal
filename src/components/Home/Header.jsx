import { Link } from "react-router-dom";
import infinityLogo from "../../assets/infinity-logo.png";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className="max-w-full">
        <div className="flex justify-between items-center py-4 px-8 bg-[#3B3D3B]/40 shadow-lg">
          <div className="px-16">
            <img
              src={infinityLogo}
              className="h-[72px] w-[76px] bg-white rounded-lg"
              alt="INFINITY LEGAL"
            />
          </div>
          <nav className="flex gap-14 items-center max-sm:hidden px-16">
            <Link to={"/"}>
              <p className="text-base font-bold text-white cursor-pointer hover:text-cyan-200 transition-colors">
                Home
              </p>
            </Link>
            <Link to={"/services"}>
              <p className="text-base font-bold text-white cursor-pointer hover:text-cyan-200 transition-colors">
                Services
              </p>
            </Link>
            <Link to="/#about">
              <p className="text-base font-bold text-white cursor-pointer hover:text-cyan-200 transition-colors">
                About
              </p>
            </Link>
            <Link to={"/news"}>
              <p className="text-base font-bold text-white cursor-pointer hover:text-cyan-200 transition-colors">
                News
              </p>
            </Link>
            <Link to={"/contact"}>
              <p className="text-base font-bold text-white cursor-pointer hover:text-cyan-200 transition-colors">
                Contact
              </p>
            </Link>
            <Link to="https://wa.me/6281239336293">
              <button className="px-8 py-3 text-base font-bold text-white bg-cyan-500 rounded-xl cursor-pointer border-none shadow-lg hover:bg-cyan-600 transition-colors">
                WhatsApp us
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
