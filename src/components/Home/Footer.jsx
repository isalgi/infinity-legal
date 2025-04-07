function Footer() {
  return (
    <footer className="px-20 pt-16 pb-10 bg-sky-50 max-sm:px-5 max-sm:py-10">
      <div className="flex justify-between mb-20 max-sm:flex-col max-sm:gap-10">
        <div className="flex flex-col gap-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/58c575e76d13a1fd2ff022656a1e57f19aa443c7?placeholderIfAbsent=true"
            className="h-[86px] w-[120px]"
            alt="INFINITY LEGAL"
          />
          <p className="text-sm text-black max-w-48">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt sit amet
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-4 pl-16">
            <h3 className="text-xl font-semibold text-cyan-600">
              Office Location
            </h3>
            <p className="text-sm text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt sit amet
            </p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c8ed2f5ea52842c3a77de52ecea8df06e8d2d34?placeholderIfAbsent=true"
              className="h-[44.5px] w-[31.5px]"
              alt="Location icon"
            />
          </div>
          <div className="flex flex-col gap-4 pl-16">
            <h3 className="text-xl font-semibold text-cyan-600">Contact us</h3>
            <p className="text-sm text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tincidunt sit amet
            </p>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/536586b7c4fe73f09e464acc5b0f83868388fdad?placeholderIfAbsent=true"
              className="h-[44.5px] w-[31.5px]"
              alt="Contact icon"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl font-semibold text-cyan-600">Services</h3>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-sm font-semibold text-black">
              Visa
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Limited Stay Permit
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Company Setup
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Legal Services
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-cyan-600">Ask Now</h3>
          <img src="wa-icon.png" alt="" className="h-[41px] w-[41px] mt-5" />
        </div>
      </div>
      <p className="text-xs font-medium text-center text-cyan-600">
        Copyright ©2025 - PT. INFINITY LEGAL. All right reserved. Liability
        limited by a scheme approved under Proffessional Standart Legislation.
      </p>
    </footer>
  );
}

export default Footer;
