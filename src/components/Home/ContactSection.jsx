function ContactSection() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-semibold text-center text-black mb-12">
        Need a Help ?
      </h2>
      <div className="flex gap-12 px-16 pb-16 max-w-7xl mx-auto bg-white max-md:flex-col max-md:p-10 max-sm:p-5">
        <div className="flex flex-col gap-8 flex-1">
          <h2 className="text-7xl font-extrabold text-black max-sm:text-5xl">
            Contact us
          </h2>
          <p className="text-base text-black max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis
            eros, id fringilla dolor iaculis quis. Donec quis purus leo.
          </p>
          <form className="flex flex-col gap-7 mt-4 max-w-md">
            <FormField placeholder="Nama Depan" required={true} />
            <FormField placeholder="Nama Belakang" required={true} />
            <FormField placeholder="Email" required={true} type="email" />
            <FormField placeholder="Nomor Telepon" required={true} type="tel" />
            <FormField
              placeholder="Kapan Anda ingin memulai bisnis?"
              required={true}
              isDropdown={true}
            />
            <FormField
              placeholder="Layanan apa yang Anda cari?"
              required={true}
              isDropdown={true}
            />
            {/* <button
              type="submit"
              className="mt-4 bg-cyan-600 text-white py-3 px-8 rounded-md font-medium self-start hover:bg-cyan-700 transition-colors"
            >
              Submit
            </button> */}
          </form>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
            className="w-full h-full object-cover max-h-[700px] pl-24"
            alt="Person's hand reaching out of the water"
          />
        </div>
      </div>
    </section>
  );
}

function FormField({
  placeholder,
  required,
  type = "text",
  isDropdown = false,
}) {
  return (
    <div className="relative">
      {isDropdown ? (
        <div className="relative">
          <select
            className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none appearance-none pr-8 text-gray-400 text-lg"
            required={required}
          >
            <option value="" disabled selected>
              {placeholder} {required && "*"}
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          placeholder={`${placeholder}${required ? " *" : ""}`}
          className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none text-lg text-gray-400 placeholder-gray-400"
          required={required}
        />
      )}
    </div>
  );
}

export default ContactSection;
