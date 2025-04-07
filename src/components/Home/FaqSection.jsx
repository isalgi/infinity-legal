import { useState } from "react";

function FaqSection() {
  const [activeTab, setActiveTab] = useState("Common");
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
      answer: "",
    },
    {
      question: "How much it will cost ?",
      answer: "",
    },
    {
      question: "Can we have a multiple services at the same time ?",
      answer: "",
    },
  ];

  const handleQuestionClick = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <section className="flex flex-col gap-10 items-start px-0 py-20 w-full bg-slate-50">
      <div className="px-20 pt-5 pb-0">
        <h3 className="text-3xl font-semibold text-black">FAQ's</h3>
        <h2 className="text-5xl font-semibold text-black">Any Question?</h2>
        <p className="text-xl text-black">
          A few common question that frequently asked.
        </p>
      </div>
      <div className="flex gap-10 px-20 py-0 max-sm:flex-col max-sm:px-5 max-sm:py-0">
        <div className="flex flex-col gap-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              className="text-2xl font-semibold text-white rounded-3xl cursor-pointer border-[none] h-[60px] w-[296px] max-sm:w-full"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3.5">
          {questions.map((item, index) => (
            <div
              key={index}
              className="px-0 py-2.5 border-b border-solid border-b-zinc-400"
              onClick={() => handleQuestionClick(index)}
            >
              <h3 className="text-3xl font-semibold text-black">
                {item.question}
              </h3>
              {expandedQuestion === index && item.answer && (
                <p className="mt-5 text-base leading-6 text-neutral-700">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
