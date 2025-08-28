"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const faqs = [
  { q: "When will I receive my commission?", a: "Depending on the service, commissions from Finsova’s reliable and rural financial services are disbursed either immediately or daily. You can keep tabs on everything from your agent dashboard." },
  { q: "What happens if an AePS transaction doesn’t work?", a: "A failed AePS transaction often reverses itself within 72 hours if the amount has been debited from the customer’s account. During this time, you can avail our assistance at all times." },
  { q: "What services are included in Micro ATMs?", a: "mATM offers all banking services, including cash withdrawals, mini statement printouts, and balance enquiries. Finsova’s merchant partner streamlines your financial activities with convenience." },
  { q: "How can I offer Finsova financial services at my store?", a: "You must sign up as a merchant with Finsova to offer rural financial services in your village. These digital banking services include AePS, utility bill payments, Micro ATM, insurance and more." },
  { q: "How do merchants benefit by partnering with Finsova?", a: "By converting stores into online banking hubs, merchants generate more revenue, increase foot traffic, and offer essential services, which include, but are not restricted to, bill pay, cash withdrawal, and recharges." },
  { q: "Can I use Finsova’s platform to make utility bill payments?", a: "Finsova offers the best financial services, which not only encourage accessibility but also convenience. You can pay your gas, water and electricity bills by using utility payment services." },
  { q: "Is using Finsova’s digital banking services secure?", a: "Yes, Finsova’s platform adheres to stringent security guidelines to provide secure, easy access to reliable financial services across India." },
  { q: "Do I get commissions for providing financial services?", a: "Indeed! You earn from every transaction, including bill payments and recharges, while benefitting your rural community with Finsova’s banking services." },
  { q: "What is AePS, and how does it benefit me?", a: "With AePS, you can provide micro statements, balance checks, and withdrawals. It helps us bring rural financial services closer to users without requiring them to visit a bank." },
];

function splitInTwo(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

export default function FinsovaFAQ() {
  const [left, right] = splitInTwo(faqs);
  // **Start closed** to match server render -> avoid hydration mismatch
  const [openIndex, setOpenIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  // If you want the first item to open only on client after mount:
  useEffect(() => {
    setMounted(true);
    // uncomment to auto-open first FAQ after mount (client-only)
    // setOpenIndex(0);
  }, []);

  const handleEnter = (index) => setOpenIndex(index);
  const handleLeave = () => setOpenIndex(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const Row = ({ item, index }) => (
    <motion.div
      layout
      className="border-b border-gray-200"
      onMouseEnter={() => handleEnter(index)}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => toggle(index)}
        aria-expanded={openIndex === index}
        className="w-full py-4 flex items-center justify-between text-left font-medium text-gray-700 text-lg bg-white hover:text-black hover:text-xl transition"
      >
        {/* use span not p to avoid nested-p */}
        <span className="block pr-6">{item.q}</span>

        <motion.span
          animate={{ rotate: openIndex === index ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-gray-500"
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {openIndex === index && (
          <motion.div
            key={`answer-${index}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="pb-4 text-gray-600"
          >
            {/* Wrap answer in a div -> inside it you can safely use <p className="m-0"> */}
            <div>
              <p className="m-0">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section className="py-16 bg-white w-[94%] mx-auto lg:mx-4" id="faq">
      <div className="max-w-7xl mx-auto lg:mx-10 px-1">


        <div className="mb-8 flex items-center justify-between gap-6">
          <div className="flex p-2 gap-5 ">
            <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />
            <h2 className="text-4xl font-serif leading-tight text-gray-700">
              Frequently <br className="hidden sm:block" />
              Asked Questions
            </h2></div>

          <Link href="/faqs" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50 hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)]">
            View All FAQs
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid lg:gap-20 gap:10 lg:grid-cols-2">
          <div >{left.map((item, i) => <Row key={i} item={item} index={i} />)}</div>
          <div >{right.map((item, i) => <Row key={i + left.length} item={item} index={i + left.length} />)}</div>
        </div>
      </div>
    </section>
  );
}
