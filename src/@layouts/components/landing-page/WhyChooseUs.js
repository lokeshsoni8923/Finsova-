"use client";

import Image from "next/image";

export default function WhyChooseUsSticky() {
  return (
    <section className="relative h-[200vh] ">
      <div className="sticky top-0 h-screen z-10 bg-[url(/choose-bg.jpg)] flex items-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
          <div className="flex items-start gap-4 mb-8">
          <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold leading-tight">
                Why Choose Us
              </h2>
              <p className="text-xl lg:text-2xl mt-1 text-gray-700">
                What problem do we solve?
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <Card
              title="Limited access to digital finance"
              desc="Tier-2/3 towns & villages mein basic banking/utility services tak pahunch mushkil."
            />
            <Card
              title="Fragmented services"
              desc="Bill pay, transfers, insurance, travel — sab alag-alag apps/mechanisms."
            />
            <Card
              title="Low income opportunities"
              desc="Retailers/merchants ko additional revenue streams milna tough."
            />
            <Card
              title="Trust & reliability issues"
              desc="Users ko secure, fast & unified platform chahiye hota hai."
            />
          </div>
        </div>
      </div>

      {/* PANEL 2 — How we solve it (slides OVER panel 1) */}
      <div className="sticky top-0 h-screen z-20 bg-[url(/choose-bg.jpg)] flex items-center shadow-[0_-30px_80px_rgba(0,0,0,0.08)]">
        <div className="max-w-6xl mx-auto px-2 lg:px-12 w-full">
          <div className="flex items-start gap-4 mb-8">
            <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />

            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold leading-tight">
                Why Choose Us
              </h2>
              <p className="text-xl lg:text-2xl mt-1 text-gray-700">
                How we solve it
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            <Card
              title="Unified platform"
              desc="DMT, AePS, BBPS, Micro-ATM, Insurance, Travel — sab ek hi app me."
              tick
            />
            <Card
              title="Merchant first"
              desc="Retailers ke liye simple onboarding, commissions & easy dashboards."
              tick
            />
            <Card
              title="Secure & fast"
              desc="Bank-grade security, instant confirmations, reliable infra."
              tick
            />
            <Card
              title="Pan-India reach"
              desc="Har gaon/town tak services le jane ka stack (agent network + app)."
              tick
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ title, desc, tick = false }) {
  return (
    <div className="rounded-2xl backdrop-blur-[2px] p-5 lg:p-6 bg-[linear-gradient(54.83deg,#E6F5F9_3.25%,#F9F9F9_95.65%)] shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3 ">
        <span
          className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            tick ? "bg-[#009883]/10 text-[#009883]" : "bg-[#384680]/10 text-[#384680]"
          }`}
        >
          {tick ? "✓" : "!"}
        </span>
        <div>
          <h3 className="text-base lg:text-lg font-semibold">{title}</h3>
          <p className="text-sm lg:text-[15px] text-gray-600 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}
