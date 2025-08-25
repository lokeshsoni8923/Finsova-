"use client";
import Image from "next/image";
import Link from "next/link";

export default function DualBanner() {
  return (
    <section className="m-4 sm:m-8 lg:m-10 w-[95%] rounded-3xl bg-[url(/img/smart-decision-banner.jpg)] bg-cover bg-center min-h-[400px] sm:min-h-[480px] lg:h-[560px] flex items-center">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-6 sm:px-10 lg:px-20 gap-6 lg:gap-10">

        {/* LEFT IMAGE */}
        <div className="flex justify-center lg:justify-start w-full lg:w-1/4">
        <Image src="/img/Mobile-left.png" width={240} height={220} alt="Mobile" className="h-[220px] sm:h-[300px] lg:h-[68vh] object-contain"/>
        </div>

        {/* CENTER TEXT */}
        <div className="flex flex-col items-center text-center lg:w-1/2 font-serif">
          <p className="mb-4 text-base sm:text-lg">
            One App. Full Access. Anytime, anywhere.
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
            Simplify Finance and<br/>Banking with One App
          </h1>
          <p className="mt-6 text-sm sm:text-base max-w-[90%] sm:max-w-[70%] lg:max-w-[60%]">
            Download the Finkeda app and make utility bill payments online, book travel, make investments, and more.
          </p>
          <button className="mt-8 sm:mt-10 border-2 border-red-100 rounded-xl px-6 sm:px-8 py-2 sm:py-3 bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-white font-light font-mono shadow-md hover:shadow-lg transition-all">
            Download App Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/4">
        <Image src="/img/Mobile-right.png" width={240} height={220}  className="h-[220px] sm:h-[300px] lg:h-[68vh] object-contain" alt="Mobile"/>

        </div>

      </div>
    </section>
  );
}
