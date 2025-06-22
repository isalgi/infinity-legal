function ContactInfo() {
  return (
    <div className="flex flex-wrap max-md:flex-col justify-between items-start px-16 max-lg:px-12 max-md:px-8 max-sm:px-4 mt-16 max-lg:mt-12 max-md:mt-8 max-sm:mt-6 w-full mb-4 max-md:gap-8 max-sm:gap-6">
      <div className="flex flex-col flex-1 shrink items-start basis-0 min-w-60 max-md:min-w-full max-md:max-w-full">
        <h1 className="flex-1 shrink gap-2.5 self-stretch w-full text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-semibold whitespace-nowrap basis-0 text-neutral-700 max-md:max-w-full">
          Contact
        </h1>

        <section className="mt-8 max-md:mt-6 max-sm:mt-4 max-w-full w-[543px] max-lg:w-[480px] max-md:w-full">
          <h2 className="gap-2.5 w-full text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base font-medium text-black max-md:max-w-full">
            Office Address
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 max-sm:mt-2 w-full text-lg max-lg:text-base max-md:text-sm max-sm:text-xs leading-8 max-lg:leading-7 max-md:leading-6 max-sm:leading-5 basis-0 text-neutral-700 max-md:max-w-full">
            Jl Raya Bypass Jl. Tanah Lot No.888x, Munggu, Bali, Kabupaten
            Badung, Bali 80351
          </p>
        </section>

        <section className="mt-8 max-md:mt-6 max-sm:mt-4 max-w-full w-[608px] max-lg:w-[480px] max-md:w-full">
          <h2 className="gap-2.5 w-full text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base font-medium text-black max-md:max-w-full">
            Business Hours
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 max-sm:mt-2 w-full text-lg max-lg:text-base max-md:text-sm max-sm:text-xs leading-8 max-lg:leading-7 max-md:leading-6 max-sm:leading-5 basis-0 text-neutral-700 max-md:max-w-full">
            Senin - Sabtu, Pukul 09.00 – 18.00 WIB
            <br />
            Minggu tutup
          </p>
        </section>

        <section className="mt-8 max-md:mt-6 max-sm:mt-4 max-w-full whitespace-nowrap w-[489px] max-lg:w-[480px] max-md:w-full">
          <h2 className="gap-2.5 w-full text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base font-medium text-black max-md:max-w-full">
            Email
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 max-sm:mt-2 w-full text-lg max-lg:text-base max-md:text-sm max-sm:text-xs basis-0 text-neutral-700 max-md:max-w-full break-all max-md:whitespace-normal">
            infinitylegalco@gmail.com
          </p>
        </section>

        <section className="mt-8 max-md:mt-6 max-sm:mt-4 max-w-full w-[489px] max-lg:w-[480px] max-md:w-full">
          <h2 className="gap-2.5 w-full text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base font-medium text-black max-md:max-w-full">
            Phone Number
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 max-sm:mt-2 w-full text-lg max-lg:text-base max-md:text-sm max-sm:text-xs basis-0 text-neutral-700 max-md:max-w-full">
            +62 812-3933-6293
          </p>
        </section>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe29ae7dac1e59fb3a1743bb7d82afd805d416a4?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1"
        className="object-contain rounded-3xl max-sm:rounded-2xl aspect-[1.12] min-w-60 max-md:min-w-full w-[615px] max-lg:w-[500px] max-md:w-full max-md:max-w-full max-md:mt-6 max-sm:mt-4"
        alt="Contact office"
      />
    </div>
  );
}

export default ContactInfo;
