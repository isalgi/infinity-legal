function ContactSection() {
  return (
    <section className="pt-10">
      <h2 className="text-3xl font-semibold text-center text-black">
        Need a Help ?
      </h2>
      <div className="flex gap-16 px-20 pt-10 pb-20 bg-white max-md:flex-col max-md:p-10 max-sm:p-5">
        <div className="flex flex-col gap-10">
          <h2 className="text-8xl font-extrabold text-black max-sm:text-5xl">
            Contact us
          </h2>
          <p className="text-xl text-black w-[683px] max-sm:w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis
            eros, id fringilla dolor iaculis quis. Donec quis purus leo.
          </p>
          <form className="flex flex-col gap-10">
            <FormField label="Nama Depan" required={true} />
            <FormField label="Nama Belakang" required={true} />
            <FormField label="Email" required={true} />
            <FormField label="Nomor Telepon" required={true} />
            <FormField
              label="Kapan Anda ingin memulai bisnis ?"
              required={true}
            />
            <FormField label="Layanan apa yang Anda cari ?" required={true} />
          </form>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a9ce0bc9d24502eca12cd63f5bed7137bc62c9b?placeholderIfAbsent=true"
          className="h-[720px] w-[564px] max-md:w-full max-md:h-auto"
          alt="Contact illustration"
        />
      </div>
    </section>
  );
}

function FormField({ label, required }) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xl text-gray-400">
        <span>{label}</span>
        {required && <span className="text-red-600">*</span>}
      </label>
      <div className="h-px bg-gray-400" />
    </div>
  );
}

export default ContactSection;
