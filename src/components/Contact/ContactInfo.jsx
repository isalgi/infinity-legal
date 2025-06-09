function ContactInfo() {
  return (
    <div className="flex flex-wrap justify-between items-start px-16 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full mb-4">
      <div className="flex flex-col flex-1 shrink items-start basis-0 min-w-60 max-md:max-w-full">
        <h1 className="flex-1 shrink gap-2.5 self-stretch w-full text-5xl font-semibold whitespace-nowrap basis-0 text-neutral-700 max-md:max-w-full max-md:text-4xl">
          Kontak
        </h1>

        <section className="mt-8 max-w-full w-[543px]">
          <h2 className="gap-2.5 w-full text-2xl font-medium text-black max-md:max-w-full">
            Alamat Kantor
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 w-full text-lg leading-8 basis-0 text-neutral-700 max-md:max-w-full">
            Jl Raya Bypass Jl. Tanah Lot No.888x, Munggu, Bali, Kabupaten
            Badung, Bali 80351
          </p>
        </section>

        <section className="mt-8 max-w-full w-[608px]">
          <h2 className="gap-2.5 w-full text-2xl font-medium text-black max-md:max-w-full">
            Hari dan Waktu Kerja
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 w-full text-lg leading-8 basis-0 text-neutral-700 max-md:max-w-full">
            Senin - Sabtu, Pukul 09.00 – 18.00 WIB
            <br />
            Minggu tutup
          </p>
        </section>

        <section className="mt-8 max-w-full whitespace-nowrap w-[489px]">
          <h2 className="gap-2.5 w-full text-2xl font-medium text-black max-md:max-w-full">
            Email
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 w-full text-lg basis-0 text-neutral-700 max-md:max-w-full">
            sales@goritax.com
          </p>
        </section>

        <section className="mt-8 max-w-full w-[489px]">
          <h2 className="gap-2.5 w-full text-2xl font-medium text-black max-md:max-w-full">
            Nomor Telepon
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 w-full text-lg basis-0 text-neutral-700 max-md:max-w-full">
            +62 812-3933-6293
          </p>
        </section>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe29ae7dac1e59fb3a1743bb7d82afd805d416a4?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1"
        className="object-contain rounded-3xl aspect-[1.12] min-w-60 w-[615px] max-md:max-w-full"
        alt="Contact office"
      />
    </div>
  );
}

export default ContactInfo;
