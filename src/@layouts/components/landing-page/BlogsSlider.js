// components/BlogSlider.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function BlogSlider() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
        else {
          console.error("API did not return an array:", data);
          setPosts([]);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Blog</h2>
        <p>Loading…</p>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Blog</h2>
        <p className="text-gray-500">No posts available yet.</p>
      </section>
    );
  }

  // If few slides, don’t force loop
  const loopEnabled = posts.length > 3;

  return (
    <section className="my-16 relative h-auto bg-gradient-to-br from-green-50 to-green-50 p-10">
      {/* Title */}
      <div className="flex items-center mx-5 gap-3 mb-8">
        <Image src="/img/CurlyLog.png" alt="curly-bracket" height={100} width={100} className="w-6 h-20 shrink-0" />

        <h2 className="text-3xl font-serif">Our Blog</h2>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        loop={loopEnabled}
        breakpoints={{
          768: { slidesPerView: Math.min(posts.length, 2) },
          1024: { slidesPerView: Math.min(posts.length, 3) },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.slug}>
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              {/* Background image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[350px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f3c88cc] via-[#1f3c884d] to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-sm opacity-90 mb-1">{post.date}</p>
                <h3 className="text-xl font-semibold mb-2">
                  {post.title}
                </h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-2">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block px-5 py-2 bg-white text-[#1f3c99] rounded-full font-medium transition hover:bg-gray-100"
                >
                  Continue Reading →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
