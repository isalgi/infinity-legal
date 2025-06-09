import { useState } from "react";

function FaqSection() {
  const [activeTab, setActiveTab] = useState("Common");
  // Set expandedQuestion to 0 (first question) by default
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const tabs = ["Common"];

  const faqData = {
    Common: [
      {
        question: "Can I get a free legal consultation?",
        answer:
          "Yes. We do not charge for pre-engagement consultations or for preliminary research related to your case or legal matter. You are welcome to discuss your needs with us with no obligation.",
      },
      {
        question: "Can consultations be conducted outside the office?",
        answer:
          "Yes. We are happy to arrange off-site meetings at a location of your choice to ensure your comfort.",
      },
      {
        question:
          "Is it safe to use Infinity Legal's services for visas, company formation, and legal matters?",
        answer:
          "Absolutely. We uphold strict confidentiality and handle every client matter with the highest professional standards.",
      },
      {
        question:
          "What makes Infinity Legal different from other service providers?",
        answer:
          "Infinity Legal offers a trusted, one-stop solution for visas, company formation, and legal services — combining expert guidance, efficient processing, and personalized support. Our team consists of highly experienced lawyers to ensure the best results for our clients.",
      },
      {
        question:
          "Can I obtain a visa or set up a PMA (foreign investment company) quickly?",
        answer:
          "It depends on your specific needs and timeline. We offer flexible service packages — standard, expedited, and priority — to accommodate different requirements. Please contact us via WhatsApp to discuss the best option for you.",
      },
      {
        question:
          "Can I apply for visas, company formation, or legal services without visiting the office?",
        answer:
          "Yes. Applications can be completed online or by submitting documents remotely. However, we recommend an initial consultation to ensure all required documents are properly prepared.",
      },
    ],
  };

  const handleQuestionClick = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setExpandedQuestion(0); // Reset to first question when changing tabs
  };

  const currentQuestions = faqData[activeTab] || [];

  return (
    <section className="py-16 w-full bg-[#F5FEFF]">
      <div className="max-w-7xl mx-auto px-8 max-sm:px-5">
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-black">FAQ's</h3>
          <h2 className="text-4xl font-semibold text-black mt-1">
            Any Question?
          </h2>
          <p className="text-base text-gray-700 mt-3">
            A few common questions that are frequently asked.
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
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col">
            {currentQuestions.map((item, index) => (
              <div
                key={index}
                className="py-4 border-b border-solid border-gray-300 cursor-pointer"
                onClick={() => handleQuestionClick(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium text-black pr-4">
                    {item.question}
                  </h3>
                  <span className="text-2xl text-[#1196A9] flex-shrink-0">
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
