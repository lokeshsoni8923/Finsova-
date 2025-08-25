"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const services = {
  individual: [
    {
      title: "Utility Bill Payments",
      desc: (
        <div>
          Pay bills instantly
          <p>
            Pay utility bills, mobile recharges, & credit card dues anytime,
            safely via your local Finkeda merchant.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-1.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "Travel Booking",
      desc: (
        <div>
          Flights, hotels, buses
          <p>
            Pay utility bills, mobile recharges, & credit card dues anytime,
            safely via your local Finkeda merchant.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-3.svg" width={100} height={100} alt="TravelBoking-Logo"/>
      ),
    },
    {
      title: "Insurance",
      desc: (
        <div>
          Life, health, motor
          <p>
            Get covered instantly with life, health, general, travel & motor
            insurance without moving out of your locality.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-4.svg" width={100} height={100} alt="Insaurance-Logo"/>
      ),
    },
    {
      title: "Investments",
      desc: (
        <div>
          Mutual funds, NCDs
          <p>
            Get covered instantly with life, health, general, travel & motor
            insurance without moving out of your locality.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-5.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "FASTag",
      desc: (
        <div>
          Recharge and manage FASTag
          <p>
            Get new FastTags, recharge existing ones & breeze through tolls.
            Quick setup at your local store.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-7.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
  ],
  business: [
    {
      title: "Money Transfer (DMT)",
      desc: (
        <div>
          Fast & secure transfers
          <p>
            Facilitate fast and secure fund transfers across India for your
            customers.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-9.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "Micro ATM",
      desc: (
        <div>
          Cash show & withdrawal
          <p>
            Provide cash withdrawals, deposits, and fund transfers from your
            shop.
          </p>{" "}
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-10.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "AePS",
      desc: (
        <div>
          Aadhar-based banking
          <p>
            Let customers withdraw cash or check balances using just their
            Aadhaar.
          </p>{" "}
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-11.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "BBPS",
      desc: (
        <div>
          Utility bill collection
          <p>
            Facilitate fast and secure fund transfers across India for your
            customers.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-12.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
    {
      title: "PAN Services",
      desc: (
        <div>
          Quick PAN issuance
          <p>
            Register or update PAN cards quickly for your walk-in customers.
          </p>
        </div>
      ),
      icon: (
        <Image src="/img/services-card-img-1.svg" width={100} height={100} alt="Utility-Logo"/>
      ),
    },
  ],
};

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="bg-[linear-gradient(238.83deg,#ffffff_4.25%,#c4dfe6_80.65%)] rounded-[35px] h-[450px] shadow-md p-6 text-center hover:shadow-lg transition w-96">
      <div className="flex">
        <div className="text-4xl mb-4">{icon}</div>
<Image src="/ServiceSlider-bg.png" height={100} width={220} alt="Utility-Logo" className="-mt-10 h-[30vh] align"/>
      </div>
      <h3 className="text-3xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState("individual");

  // refs for custom buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-20 bg-[#E6F5F3] relative h-[85vh] mt-5 p-20 pt-8 m-10 justify-center rounded-3xl w-[94%]">
      {/* Title */}
      <div className="flex items-center mb-5 gap-52">
        <div className="flex mx-3 px-5 w-30 gap-5">
          <div className="w-px-16">
          <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />
          </div>
          <h2 className="text-3xl font-medium mb-5 mt-6">Our Services</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "individual"
                ? "font-light bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-white"
                : "bg-transparent font-light border border-black"
            }`}
          >
            For Individuals
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === "business"
                ? "font-light bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-white"
                : "bg-transparent font-light border border-black"
            }`}
          >
            For Businesses
          </button>
        </div>
      </div>

      {/* Slider with custom nav */}
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Custom Nav Buttons (top-right corner) */}
        <div className="absolute -top-24 right-0 flex space-x-3 z-10">
          <button
            ref={prevRef}
            className="bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] border-black border-[1px] text-black p-4 bg-tr rounded-[50%]"
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-black p-4 border-[1px] border-black rounded-[50%]"
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={"-40px"}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={services[activeTab].length > 3}
        onInit={(swiper) => {
          // custom navigation attach
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {services[activeTab].map((svc, i) => (
          <SwiperSlide key={i}>
            <ServiceCard {...svc} />
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
