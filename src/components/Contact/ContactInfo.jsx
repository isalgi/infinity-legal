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
            Bypass Road, Tanah Lot Street No. 888x, Munggu, Badung Regency, Bali
            Province 80351
          </p>
        </section>

        <section className="mt-8 max-md:mt-6 max-sm:mt-4 max-w-full w-[608px] max-lg:w-[480px] max-md:w-full">
          <h2 className="gap-2.5 w-full text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base font-medium text-black max-md:max-w-full">
            Business Hours
          </h2>
          <p className="flex-1 shrink gap-2.5 mt-2.5 max-sm:mt-2 w-full text-lg max-lg:text-base max-md:text-sm max-sm:text-xs leading-8 max-lg:leading-7 max-md:leading-6 max-sm:leading-5 basis-0 text-neutral-700 max-md:max-w-full">
            Opening Hours: Monday to Saturday, 9:00 AM – 6:00 PM (Central
            Indonesian Time)
            <br />
            Closed on Sunday
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

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d986.1897026765927!2d115.11716669999998!3d-8.6191389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOMKwMzcnMDguOSJTIDExNcKwMDcnMDEuOCJF!5e0!3m2!1sen!2sid!4v1750699451545!5m2!1sen!2sid"
        className="rounded-3xl max-sm:rounded-2xl min-w-60 max-md:min-w-full w-[615px] max-lg:w-[500px] max-md:w-full max-md:max-w-full max-md:mt-6 max-sm:mt-4 border-0"
        style={{ aspectRatio: "1.12", height: "550px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location Map"
      />
    </div>
  );
}

export default ContactInfo;
