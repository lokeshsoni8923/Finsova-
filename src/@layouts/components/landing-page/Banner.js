"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slides = [
  {
    id: 1,
    image: "/img/Banner1.jpg",
    text: (
      <div className="font-serif text-black">
        Digital Banking
        <br />
        Solution to
        <br />
        Every Doorstep <br />
        and Village
        <br />
        <br />
        <p className="text-sm font-thin">
          Our Trusted financial services bring
          <br />
          essential banking services to stores
          <br />
          near you.
        </p>{" "}
        <br />
      </div>
    ),
    btn: "Download Now",
  },
  {
    id: 2,
    image: "/img/Banner2.png",
    text: (
      <div className="font-thin from-neutral-700 text-white">
        {" "}
        Domestic
        <br />
        Money Transfer
        <br />
        (DMT) <br />
        <br />
        <p className="text-sm font-thin">
          Faciliate fast and secure fund transfers
          <br />
          across india for your customers.
        </p>{" "}
        <br />
        <br />
      </div>
    ),
    btn: "Download App",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="relative h-[100vh] rounded-3xl mt-4 w-[94%]  "
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="text-4xl-black md:text-5xl font-bold text-center px-4">
              {slide.text}
            </div>
            <button
              className="px-5 py-3 rounded-xl text-white font-medium shadow-md transition active:translate-y-px bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009883]/40"            >
              {slide.btn}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
