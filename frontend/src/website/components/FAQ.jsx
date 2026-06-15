import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "How long are the courses?",
    answer: "Courses typically range from 3 to 6 months depending on the program.",
  },
  {
    question: "Do you provide placement assistance?",
    answer: "Yes, we provide full placement support including resume, mock interviews and referrals.",
  },
  {
    question: "Are the classes online or offline?",
    answer: "We provide Online, Offline and Hybrid learning modes.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes, you will receive an industry-recognized certificate after course completion.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
            Common Questions
          </h2>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-medium">
            Everything you need to know about our learning programs
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="text-slate-500 mt-3">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;