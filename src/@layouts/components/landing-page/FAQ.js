import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    q: "What is Finsova?",
    a: "Finsova is a financial solutions platform designed to help individuals and businesses manage their money smarter.",
  },
  {
    q: "Do I need to pay to use it?",
    a: "Nope! We offer a free plan with essential features. You can upgrade if you need advanced tools.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel or downgrade your plan at any time without hidden charges.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use bank-level encryption to ensure your data stays private and safe.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-20 "
      id="faq"
    >
      <div className="max-w-4xl px-6">
      <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
       <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />

        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        </div>

        <div className="space-y-6 mx-10 min-w-[100%]">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="border rounded-lg shadow-sm overflow-hidden"
              transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 text-gray-700 mt-auto h-9"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
