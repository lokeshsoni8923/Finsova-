"use client"
import { motion } from "framer-motion"
import { Texturina } from "next/font/google"
import { useEffect, useState } from "react"
  const quintessential = Texturina({
  subsets: ["latin"],
  weight: "400", // ye font ka ek hi weight hota hai
})
export default function StockGrowthIntro() {
  const [showContent, setShowContent] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2500) // 2.5 sec me main site dikhegi
    return () => clearTimeout(timer)
  }, [])

  if (showContent) return null // ye sirf intro ke liye hoga, baad me hat jayega

  return (
    <div className="fixed inset-0 bg-purple-900 flex items-center justify-center z-50">
      <div className="relative w-[80%] max-w-xl h-[300px] flex items-center justify-center">

        {/* Stock Line Path */}
        <svg
          viewBox="0 0 500 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M 20 150 L 100 120 L 180 130 L 260 80 L 340 100 L 420 40"
            stroke="url(#gradient)"
            strokeWidth="4"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Gradient for line */}
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#E879F9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glowing Dots on Peak */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-[20%] right-[15%] w-4 h-4 rounded-full bg-pink-400 shadow-[0_0_20px_5px_rgba(236,72,153,0.8)]"
        />

        {/* Logo Appears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute items-center justify-center"
        >

        <h1 className={`font-extralight ${quintessential.className} text-blue-200 text-9xl -mt-80`}>Finsova</h1>
        <h4 className={`font-extralight ${quintessential.className} text-black text-xl  `}>Simplify your bill payment process and save time with our easy-to-use platform</h4>

        </motion.div>
      </div>
    </div>
  )
}
