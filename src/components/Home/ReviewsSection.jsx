import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

function ReviewsSection() {
  const reviews = [
    {
      name: "Ethan Varrow",
      review:
        "I had a great experience with this legal and visa service in Bali. The team was not only fast and efficient, but also incredibly trustworthy and professional throughout the entire process. You can tell they genuinely care about helping their clients and go out of their way to provide the best service possible. Their pricing is also fair and transparent, which made the whole experience even more reassuring. I wouldn't hesitate to recommend them to anyone needing visa or legal assistance in Bali  they truly make everything smooth and stress-free.",
    },
    {
      name: "Lydia Vexley",
      review:
        "The team was incredibly responsive and always ready to help, no matter how many questions I had. They took the time to explain everything clearly and patiently, which made the whole process feel a lot less overwhelming. I truly appreciated their professionalism and the friendly way they handled everything.",
    },
    {
      name: "Vincent Kellor",
      review:
        "I had a fantastic experience with Infinity Legal in Bali. From the start, their communication was clear, professional, and friendly. They responded quickly to every question I had, and the entire process was handled efficiently and without any hassle. Everything moved faster than I expected, which was a huge relief. I'm genuinely grateful for the support and service I received thank you to the entire Infinity Legal team! I highly recommend them to anyone needing legal or visa assistance in Bali.",
    },
    {
      name: "Marcus Tolland",
      review:
        "The team was not only competent, but also offered a very personalized approach it never felt like a one-size-fits-all process. They understood our situation and managed to help us extend our visas quickly and without any stress. Their professionalism and efficiency truly stood out, and we felt well taken care of from start to finish. I highly recommend their services to anyone.",
    },
    {
      name: "Nathan Pryce",
      review:
        "The staff was incredibly helpful, friendly, and made the whole process feel really easy. On top of that, they offered a very reasonable price for my visa, which I truly appreciated! It's not always easy to find a service that's both professional and welcoming, but they definitely delivered on both. I'll definitely be coming back here when it's time to extend my visa again. Highly recommended!",
    },
    {
      name: "Paige Ellstrom",
      review:
        "I'm really impressed with the service I received they were able to help me get an urgent visa at the very last minute. Everything was handled incredibly fast and professionally, and the team stayed calm and focused the entire time. It's clear they know exactly what they're doing, and their determination to get things done quickly really stood out. Huge thanks to the team you truly saved the day. Well done!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsToShow = 3;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Slides every 4 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Get the current 3 reviews to display
  const getCurrentReviews = () => {
    const current = [];
    for (let i = 0; i < reviewsToShow; i++) {
      const index = (currentIndex + i) % reviews.length;
      current.push(reviews[index]);
    }
    return current;
  };

  const currentReviews = getCurrentReviews();

  return (
    <section className="px-0 py-10 bg-white overflow-hidden">
      <h2 className="mb-10 text-3xl font-bold text-center text-cyan-600">
        Our Reviews
      </h2>
      <div className="max-w-7xl mx-auto px-8 max-sm:px-5">
        <div className="flex justify-between transition-transform duration-500 ease-in-out max-md:flex-col max-md:gap-10 max-md:items-center">
          {currentReviews.map((review, index) => (
            <ReviewCard
              key={`${currentIndex}-${index}`}
              index={index}
              name={review.name}
              review={review.review}
            />
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-cyan-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
