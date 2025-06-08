import { useState } from "react";

function FaqSection() {
  const [activeTab, setActiveTab] = useState("Common");
  // Set expandedQuestion to 0 (first question) by default
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const tabs = ["Common", "Services", "Process", "Company"];

  const faqData = {
    Common: [
      {
        question:
          "Is there a deadline or time limit for scheduling an appointment?",
        answer:
          "There is no specific deadline; however, we recommend confirming your appointment in advance via our official WhatsApp channel to ensure better coordination.",
      },
      {
        question:
          "Is it possible to have a walk-in consultation at the office without a prior appointment?",
        answer:
          "Yes, of course. You are welcome to visit our office directly for a consultation.",
      },
      {
        question: "Is it possible to have a consultation outside the office?",
        answer:
          "Absolutely Possible. We are happy to arrange off-site meetings to suit your needs. Your comfort throughout the consultation process is our priority.",
      },
    ],
    Services: [
      {
        question:
          "What types of visas, KITAS, company set-up, and legal services are available through PT Infinity Legal?",
        answer:
          "At PT Infinity Legal, we offer a comprehensive range of visa, KITAS, company setup, and legal services. Our offerings include Single Entry Visa, Visitor Visa, Multiple Entry Visa, Family KITAS Visa, Digital Nomad Visa, Investor KITAS, Working KITAS, Retirement KITAS, as well as company dissolution, virtual office solutions, LKPM reporting, PMA registration, tax and accounting services, NPWP processing, contract review and drafting, legal representation, and notarial services. Our experienced team is dedicated to guiding you in selecting the most suitable visa, KITAS, company setup, and legal services tailored to your needs, ensuring a smooth and efficient application process from start to finish.",
      },
      {
        question: "What sets PT Infinity Legal apart from others?",
        answer:
          "PT Infinity Legal stands out as a trusted one-stop provider of visa, KITAS, company setup, and legal services, combining expert guidance, efficient processing, and personalized support to ensure a smooth and worry-free experience for every client.",
      },
    ],
    Process: [
      {
        question:
          "Is there a deadline for submitting applications for visa, KITAS, and company setup?",
        answer:
          "We recommend scheduling a consultation with us in advance. Our experienced team will guide you through every step to ensure your visa, KITAS, and company setup are completed on time, eliminating any last-minute stress.",
      },
      {
        question:
          "Is it possible to apply for a visa, KITAS, company setup, and legal services without visiting the office?",
        answer:
          "Of course, you can apply for a visa, KITAS, company setup, and legal services online or by submitting the required documents. However, we recommend scheduling a consultation first to better assist you in preparing the necessary paperwork.",
      },
    ],
    Company: [
      {
        question:
          "Is it safe to apply for a visa, KITAS, company setup, and legal services through PT Infinity Legal?",
        answer:
          "Absolutely. Our professional and experienced team will guide you by providing precise advice and recommendations tailored to your specific needs. In matters of visa processing, KITAS, company setup, and legal services, we have successfully assisted numerous clients. Therefore, do not hesitate to collaborate with us.",
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
          <h3 className="text-xl font-semibold text-black">FAQ</h3>
          <h2 className="text-4xl font-semibold text-black mt-1">
            Frequently Asked Questions
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
