function Header() {
  return (
    <header className="flex absolute top-0 left-0 justify-between items-center px-20 py-2.5 w-full h-[120px] z-[100] max-md:px-10 max-md:py-2.5 max-sm:px-5 max-sm:py-2.5 max-sm:h-20">
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/889e19cd196e3b77ec75c3faa4f6573c74025934?placeholderIfAbsent=true"
          className="h-[72px] w-[72px]"
          alt="INFINITY LEGAL"
        />
      </div>
      <nav className="flex gap-9 items-center max-sm:hidden">
        <a href="#" className="text-base font-bold text-white cursor-pointer">
          Home
        </a>
        <a href="#" className="text-base font-bold text-white cursor-pointer">
          Services
        </a>
        <a href="#" className="text-base font-bold text-white cursor-pointer">
          About
        </a>
        <a href="#" className="text-base font-bold text-white cursor-pointer">
          News
        </a>
        <a href="#" className="text-base font-bold text-white cursor-pointer">
          Contact
        </a>
      </nav>
      <button className="px-8 py-3 text-base font-bold text-white bg-cyan-500 rounded-xl cursor-pointer border-[none] h-[43px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        Whatsapp Kami
      </button>
    </header>
  );
}

export default Header;
