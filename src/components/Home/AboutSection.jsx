function AboutSection() {
  return (
    <section className="flex flex-col justify-center items-center px-20 py-0 w-full min-h-screen max-sm:px-5 max-sm:py-16 overflow-hidden relative">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://jxtylpahapimibfnchjt.supabase.co/storage/v1/object/public/videos//about-section%20(1).mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>

      {/* Content */}
      <div className="flex flex-col gap-5 max-w-[1264px] relative z-20">
        <h2 className="text-3xl font-semibold text-white">About us</h2>
        <p className="text-base font-medium leading-5 text-white mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis
          eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas
          convallis congue pretium. Maecenas ac interdum tortor, sed ultricies
          lorem. Morbi congue, quam blandit elementum venenatis, quam quam
          cursus urna, in rhoncus nunc metus ut ligula. Curabitur vehicula
          iaculis iaculis. Aliquam nec rutrum mauris. Curabitur ullamcorper in
          velit sit amet ullamcorper.
          <br />
          mollis, urna id rutrum sollicitudin, enim justo porta turpis, et
          finibus nibh est eget eros. Cras sit amet velit accumsan, volutpat
          metus id, bibendum urna. Duis rutrum condimentum tellus in viverra.
        </p>
        <div className="flex justify-between items-center mt-5">
          <button className="px-8 py-3 text-base font-bold text-white rounded-md border border-white border-solid cursor-pointer">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
