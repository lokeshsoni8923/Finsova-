'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Rohit Sharma',
    role: 'Entrepreneur',
    text: 'Finsova helped me simplify my business finances. Their team is amazing!',
    image: '/img/manju.jpg'
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Startup Founder',
    text: 'The support and solutions I got were practical and super effective.',
    image: '/img/imact-slide-img.jpg'
  },
  {
    id: 3,
    name: 'Amit Verma',
    role: 'Small Business Owner',
    text: 'I finally feel confident about my financial growth thanks to Finsova.',
    image: '/img/heemant.jpg'
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    role: 'Consultant',
    text: 'Working with Finsova gave me clarity in handling my client finances.',
    image: '/img/manju.jpg'
  },
  {
    id: 5,
    name: 'Ankit Jain',
    role: 'Business Coach',
    text: 'I recommend Finsova to every entrepreneur who wants stress-free finance.',
    image: '/img/imact-slide-img.jpg'
  }
]

export default function Testimonials() {
  return (
    <section className='py-12 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg' id='testimonials'>
      {/* Section Heading */}
      <div className='flex items-center gap-4 px-6 mb-10 relative'>
        <Image src='/img/CurlyLog.png' alt='curly-bracket' height={100} width={100} className='w-6 h-20 shrink-0' />
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-serif font-bold'>
          Voice from Every
          <br className='hidden sm:block' /> Corner We Serve
        </h2>

        {/* Navigation Buttons */}
        <div className='absolute right-6 top-2 sm:top-6 flex gap-3 z-10'>
          <button className='swiper-button-prev-test bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-black p-2 sm:p-3 lg:p-4 border border-black rounded-full transition-all'>
            ❮
          </button>
          <button className='swiper-button-next-test bg-transparent hover:bg-[linear-gradient(269.83deg,_#009883_-52.73%,_#384680_99.89%)] text-black p-2 sm:p-3 lg:p-4 border border-black rounded-full transition-all'>
            ❯
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className='max-w-8xl mx-auto px-4 sm:px-6'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-test',
            prevEl: '.swiper-button-prev-test'
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 } // Desktop
          }}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className='p-6 sm:p-8 lg:p-9 mt-2 rounded-4xl shadow-lg bg-gray-50 hover:bg-gradient-to-r hover:from-green-100 hover:to-pink-50 transition-all duration-300 border border-gray-200 text-center'>
                <img src={t.image} alt={t.name} className='mx-auto w-28 h-28 object-cover rounded-xl shadow-md' />
                <p className='text-gray-600 text-sm sm:text-base mt-4 mb-4'>“{t.text}”</p>
                <hr className='w-full border border-gray-300  mb-3' />
                <h4 className='font-semibold text-base'>{t.name}</h4>
                <span className='text-sm text-gray-500'>{t.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
