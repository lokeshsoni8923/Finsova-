"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const partners = [
  "/img/razorpay.png",
  "/img/airtel-payments-bank.png",
  "/img/razorpay.png",
  "/img/rbl-bank.png",
  "/img/red-bus.png",
  "/img/freecharge.png",
];

export default function PartnersSection() {
  const swiperRef = useRef(null);

  return (
    <section className="py-5 pb-9 bg-white relative w-auto">
      <div className="flex mx-3 px-5 w-30 gap-5 justify-between items-center">
        <div className="flex w-px-16">
         <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />
          <h2 className="text-3xl pl-4 font-medium mb-5 mt-6">Our Partners</h2>
        </div>

        <div className="flex p-5 m-5 gap-5">
          <button
            className="bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-black p-4 border-[1px] border-black rounded-[50%]"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ❮
          </button>
          <button
            className="bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-black p-4 border-[1px] border-black rounded-[50%]"
            onClick={() => swiperRef.current?.slideNext()}
          >
            ❯
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mx-8 border-2 border-black w-auto p-[20px] rounded-3xl">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          loop={partners.length > 4}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {partners.map((logo, idx) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <img
                src={logo}
                alt={`Partner ${idx + 1}`}
                className="object-contain h-12"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom buttons */}
      </div>
    </section>
  );
}
