"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/mousewheel";
import { Mousewheel } from "swiper/modules";

const services = [
  {
    title: "Utility Bill Payments",
    desc: "Pay utility bills, mobile recharges, & credit card dues anytime, safely via your local merchant.",
  },
  {
    title: "Travel Booking",
    desc: "Flights, hotels, buses booking instantly with secure payments.",
  },
  {
    title: "Insurance",
    desc: "Get covered instantly with life, health, motor & travel insurance.",
  },
  {
    title: "Investments",
    desc: "Mutual funds, NCDs and many more investment options.",
  },
  {
    title: "FASTag",
    desc: "Recharge and manage FASTag easily at local stores.",
  },
];

export default function ServicesSection() {
  return (
    <div className="w-full h-screen bg-gray-50 overflow-hidden">
      <h2 className="text-3xl font-bold text-center pt-10">
        Comprehensive Business Solutions
      </h2>

      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true, // 👈 ye magic line hai
        }}
        modules={[Mousewheel]}
        className="w-[100%] h-[80vh]"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
          <div className="w-[80%] mx-[10%] bg-white rounded-3xl flex flex-col items-center justify-center text-center h-[70vh]">

              <h3 className="text-2xl font-semibold mb-6">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.desc}</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
