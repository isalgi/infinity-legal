import about from "../../assets/banner-about.jpeg";

function AboutSection() {
  return (
    <section
      className="flex flex-col justify-center items-center px-20 py-0 w-full h-[648px] max-sm:px-5 max-sm:py-16 max-sm:h-auto"
      style={{
        backgroundImage: `url(${about})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-5 max-w-[1264px]">
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
          <button className="text-base font-bold text-white underline cursor-pointer">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
