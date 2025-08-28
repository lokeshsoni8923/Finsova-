"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-[#140f2a] text-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        direction="horizontal"
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-screen"
      >
        {/* ---------- Slide 1 (Hero Section) ---------- */}
        <SwiperSlide>
          <div className="relative h-screen flex flex-col items-center justify-center">
            {/* Animated Wave */}
            <motion.div
              className="absolute bottom-0 w-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-full h-40" viewBox="0 0 1440 320">
                <motion.path
                  fill="#8400ff"
                  fillOpacity="0.6"
                  d="M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,224C672,213,768,139,864,117.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128V320H0Z"
                  animate={{
                    d: [
                      "M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,224C672,213,768,139,864,117.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128V320H0Z",
                      "M0,180L48,174.7C96,169,192,159,288,180C384,201,480,245,576,234C672,223,768,159,864,137.3C960,116,1056,148,1152,158.7C1248,169,1344,159,1392,153.3L1440,148V320H0Z",
                      "M0,160L48,154.7C96,149,192,139,288,160C384,181,480,235,576,224C672,213,768,139,864,117.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128V320H0Z",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-bold z-10 text-center"
            >
              Digital Banking <br /> Solution to Every Doorstep <br /> and Village
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg mt-6 text-gray-300 z-10"
            >
              Smarter Banking for Everyone
            </motion.p>
          </div>
        </SwiperSlide>

        {/* ---------- Slide 2 (About Section) ---------- */}
        <SwiperSlide>
          <div className="h-screen flex flex-col items-center justify-center bg-[#1b1630] text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold mb-6"
            >
              Why Choose Finsova?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="max-w-2xl text-lg text-gray-300"
            >
              We provide seamless banking solutions for both individuals and businesses,
              with cutting-edge digital services designed for modern finance.
            </motion.p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
