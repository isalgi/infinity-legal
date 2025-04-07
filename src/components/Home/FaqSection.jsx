import { useState } from "react";

function FaqSection() {
  const [activeTab, setActiveTab] = useState("Common");
  // Set expandedQuestion to 0 (first question) by default
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const tabs = ["Common", "Product", "Agreement", "Legality"];

  const questions = [
    {
      question: "How we help you ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    },
    {
      question: "What kind of services we have ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    },
    {
      question: "How much it will cost ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    },
    {
      question: "Can we have a multiple services at the same time ?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    },
  ];

  const handleQuestionClick = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className="py-16 w-full bg-[#F5FEFF]">
      <div className="max-w-6xl mx-auto px-8 max-sm:px-5">
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-black">FAQ's</h3>
          <h2 className="text-4xl font-semibold text-black mt-1">
            Any Question?
          </h2>
          <p className="text-base text-gray-700 mt-3">
            A few common question that frequently asked.
          </p>
        </div>

        <div className="flex gap-12 max-sm:flex-col">
          <div className="flex flex-col gap-4 w-64 max-sm:w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-base font-medium rounded-full py-3 px-6 transition-colors ${
                  activeTab === tab
                    ? "bg-[#1196A9] text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            {questions.map((item, index) => (
              <div
                key={index}
                className="py-4 border-b border-solid border-gray-300 cursor-pointer"
                onClick={() => handleQuestionClick(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-black">
                    {item.question}
                  </h3>
                  <span className="text-2xl text-[#1196A9]">
                    {expandedQuestion === index ? "×" : "+"}
                  </span>
                </div>
                {expandedQuestion === index && (
                  <p className="mt-4 text-base leading-6 text-gray-700">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
