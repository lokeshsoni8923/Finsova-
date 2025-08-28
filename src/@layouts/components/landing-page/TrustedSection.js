"use client";
import Image from 'next/image'
import CountUp from 'react-countup';

export default function TrustedSection() {
  return (
    <section className='py-16 w-full'>
      <div className='container  mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12'>

        {/* LEFT TEXT + NUMBERS */}
        <div className='lg:w-1/2 text-center lg:text-left'>
          {/* Heading */}
          <div className='flex items-center justify-center lg:justify-start gap-3 mb-6'>
            <Image src='/img/CurlyLog.png' alt='curly-bracket' height={100} width={100} className='w-6 h-20 shrink-0' />
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug'>
              Trusted by Thousands,
              <br className='hidden sm:block' /> Growing Every Day
            </h2>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 rounded-4xl p-4 sm:grid-cols-2 gap-8 sm:gap-10 mt-10'>

            {/* Merchants */}
            <div className='text-center sm:text-left'>
              <Image src='/img/marker.png' alt='Merchants' height={100} width={100} className='w-10 h-10 mx-auto sm:mx-0 mb-3'/>
              <p className='text-xl sm:text-2xl font-bold'>
                <CountUp end={50000} duration={1} separator="," />+
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Total Merchants</p>
            </div>

            {/* Transaction Value */}
            <div className='text-center sm:text-left'>
              <Image src='/img/money.png' alt='Transaction' height={100} width={100} className='w-10 h-10 mx-auto sm:mx-0 mb-3'/>
              <p className='text-xl sm:text-2xl font-bold'>
                ₹<CountUp end={5000} duration={1} separator="," />+
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Average Transaction Value</p>
            </div>

            {/* Transactions Per Month */}
            <div className='text-center sm:text-left'>
              <Image src='/img/calculator.png' height={100} width={100} alt='Transactions' className='w-10 h-10 mx-auto sm:mx-0 mb-3'/>
              <p className='text-xl sm:text-2xl font-bold'>
                <CountUp end={203400} duration={1} separator="," />+
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Transactions Per Month</p>
            </div>

            {/* Employees */}
            <div className='text-center sm:text-left'>
              <Image src='/img/conference.png' height={100} width={120} alt='Employees' className='w-10 h-10 mx-auto sm:mx-0 mb-3'/>
              <p className='text-xl sm:text-2xl font-bold'>
                <CountUp end={350} duration={1} separator="," />+
              </p>
              <p className='text-gray-600 text-sm sm:text-base'>Total Employees</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className='lg:w-1/2 flex justify-center'>
          <img
            src='https://Finsova.com/wp-content/themes/Finsova/assets/images/map.png'
            alt='India Map'
            className='w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]'
          />
        </div>
      </div>
    </section>
  )
}
