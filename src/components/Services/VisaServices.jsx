import VisaCard from "./VisaCard";

function VisaServices() {
  const firstRowCards = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2d21fb6f537469c48803b21a72aa35e9b3cd1402?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Visa on arrival",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dig",
      hasPricing: true,
      price: "IDR 660.000",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0a9070557d68b8f853ee84ebe59a49ab76a354c6?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Single Entry",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f0e2de55c11b3c476d20f8fc6699f90e74efc7bc?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Multiple Entry",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2d4fc0de22318219c0227d304b0ee635aea3e5b2?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Legal Services",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
  ];

  const secondRowCards = [
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2d21fb6f537469c48803b21a72aa35e9b3cd1402?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Visa",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0a9070557d68b8f853ee84ebe59a49ab76a354c6?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Limited Stay Permit",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f0e2de55c11b3c476d20f8fc6699f90e74efc7bc?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Company Setup",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
    {
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2d4fc0de22318219c0227d304b0ee635aea3e5b2?placeholderIfAbsent=true&apiKey=0f6a69545387481e8abec5b167985ce1",
      title: "Legal Services",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis eros, id fringilla dolor iaculis quis. Donec quis purus leo. Maecenas convallis congue pretium. Maecenas ac interdum tortor, sed ultricies lorem.",
    },
  ];

  return (
    <section className="flex gap-10 justify-center items-center">
      <div className="overflow-hidden flex-1 shrink p-16 w-full basis-0 bg-neutral-50 min-w-60 max-md:px-5 max-md:max-w-full">
        <h2 className="gap-2.5 self-stretch w-full text-3xl font-bold leading-none text-cyan-600 whitespace-nowrap max-md:max-w-full">
          Visa
        </h2>

        <div className="flex flex-wrap gap-9 justify-center items-center mt-10 w-full max-md:max-w-full">
          {firstRowCards.map((card, index) => (
            <VisaCard
              key={`first-row-${index}`}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              hasPricing={card.hasPricing}
              price={card.price}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-9 justify-center items-center mt-10 w-full max-md:max-w-full">
          {secondRowCards.map((card, index) => (
            <VisaCard
              key={`second-row-${index}`}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VisaServices;
