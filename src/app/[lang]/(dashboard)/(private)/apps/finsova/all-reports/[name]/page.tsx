'use client'

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useParams } from 'next/navigation'
import { Button } from '@mui/material'

interface FormValues {
  duration: string
  customStartDate: Date | null
  customEndDate: Date | null
  service: string
}

const durationOptions = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'This Month',
  'Last Month',
  'Custom Range'
]

const serviceOptions = [
  'FUND SETTLEMENT',
  'FUND WITHDRAWAL',
  'EDUCATION FEE',
  'DMT',
  'AEPS',
  'Load Money',
  'Add Money',
  'Razorpay Load Money',
  'PAYTM Load Money',
  'Qr Load Money',
  'Virtual Account',
  'Wallet Ledger',
  'Old Wallet Ledger',
  'Fund Requests',
  'Reserve Wallet',
  'RECHARGE',
  'OFFLINE',
  'BBPS',
  'UTI',
  'CMS',
  'IK BILL PAY',
  'CARD BILL PAYMENT',
  'EXPRESSPAY',
  'DMT PLUS',
  'MONEY TRANSFER',
  'MATM',
  'FLIGHT BOOKING',
  'INSURANCE DEKHO',
]

const validationSchema = Yup.object().shape({
  duration: Yup.string().required('Duration is required'),
  service: Yup.string().required('Service is required'),
  customStartDate: Yup.date().when('duration', {
    is: 'Custom Range',
    then: schema => schema.required('Start Date is required')
  }),
  customEndDate: Yup.date().when('duration', {
    is: 'Custom Range',
    then: schema => schema.required('End Date is required')
  })
})

// ✅ Helper functions for date calculations
const getToday = () => new Date()

const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date
}

const getLast7Days = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 6)
  return { start, end }
}

const getLast30Days = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 29)
  return { start, end }
}

const getThisMonth = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return { start, end }
}

const getLastMonth = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 0)
  return { start, end }
}

const ReportSearchForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [displayDateRange, setDisplayDateRange] = useState<string>('')
  const params = useParams()
  const [selectedService, setSelectedService] = useState<string>('')

  useEffect(() => {
    if (params.name) {
      const decodedName = decodeURIComponent(params.name as string)
      setSelectedService(decodedName)
    }
  }, [params.name])

  const initialValues: FormValues = {
    duration: '',
    customStartDate: null,
    customEndDate: null,
    service: selectedService
  }

  const handleSubmit = (values: FormValues) => {
    console.log('Form Data:', values)
    if (values.duration === 'Custom Range') {
      console.log(`Selected Custom Range: ${values.customStartDate} - ${values.customEndDate}`)
    }
  }

  return (
    <div className='p-6 border rounded-lg max-w-4xl mx-auto shadow-md bg-white'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold'>Search</h2>
        <Button
          variant='contained'
          color='error'
          onClick={() => window.history.back()}
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            px: 3,
            py: 1
          }}
        >
          GO BACK
        </Button>
      </div>
      {selectedService && (
        <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded'>
          <p className='text-blue-800'>
            <strong>Selected Service:</strong> {selectedService}
          </p>
        </div>
      )}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => {
          // Update the service field when selectedService changes
          React.useEffect(() => {
            if (selectedService) {
              setFieldValue('service', selectedService)
            }
          }, [selectedService, setFieldValue])

          return (
            <Form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Duration Dropdown */}
                <div>
                  <label className='block mb-2 font-medium text-gray-700'>
                    Duration<span className='text-red-500'>*</span>
                  </label>
                  <Field
                    as='select'
                    name='duration'
                    className='border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedValue = e.target.value
                      setFieldValue('duration', selectedValue)

                      // ✅ Auto-set dates for predefined ranges
                      if (selectedValue === 'Today') {
                        const today = getToday()
                        setStartDate(today)
                        setEndDate(today)
                        setFieldValue('customStartDate', today)
                        setFieldValue('customEndDate', today)
                      } else if (selectedValue === 'Yesterday') {
                        const yesterday = getYesterday()
                        setStartDate(yesterday)
                        setEndDate(yesterday)
                        setFieldValue('customStartDate', yesterday)
                        setFieldValue('customEndDate', yesterday)
                      } else if (selectedValue === 'Last 7 Days') {
                        const { start, end } = getLast7Days()
                        setStartDate(start)
                        setEndDate(end)
                        setFieldValue('customStartDate', start)
                        setFieldValue('customEndDate', end)
                      } else if (selectedValue === 'Last 30 Days') {
                        const { start, end } = getLast30Days()
                        setStartDate(start)
                        setEndDate(end)
                        setFieldValue('customStartDate', start)
                        setFieldValue('customEndDate', end)
                      } else if (selectedValue === 'This Month') {
                        const { start, end } = getThisMonth()
                        setStartDate(start)
                        setEndDate(end)
                        setFieldValue('customStartDate', start)
                        setFieldValue('customEndDate', end)
                      } else if (selectedValue === 'Last Month') {
                        const { start, end } = getLastMonth()
                        setStartDate(start)
                        setEndDate(end)
                        setFieldValue('customStartDate', start)
                        setFieldValue('customEndDate', end)
                      } else if (selectedValue !== 'Custom Range') {
                        setStartDate(null)
                        setEndDate(null)
                        setFieldValue('customStartDate', null)
                        setFieldValue('customEndDate', null)
                      }
                    }}
                  >
                    <option value=''>Select Duration</option>
                    {durationOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='duration' component='div' className='text-red-500 text-sm' />
                </div>

                {/* Custom Range Date Pickers */}
                {values.duration === 'Custom Range' && (
                  <div className='flex space-x-4'>
                    <div>
                      <label className='block mb-1 font-medium'>Start Date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => {
                          setStartDate(date)
                          setFieldValue('customStartDate', date)
                        }}
                        className='border p-2 rounded w-full'
                        dateFormat='dd MMM yyyy'
                      />
                      <ErrorMessage name='customStartDate' component='div' className='text-red-500 text-sm' />
                    </div>
                    <div>
                      <label className='block mb-1 font-medium'>End Date</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => {
                          setEndDate(date)
                          setFieldValue('customEndDate', date)
                        }}
                        className='border p-2 rounded w-full'
                        dateFormat='dd MMM yyyy'
                      />
                      <ErrorMessage name='customEndDate' component='div' className='text-red-500 text-sm' />
                    </div>
                  </div>
                )}

                {/* Service Dropdown */}
                <div>
                  <label className='block mb-2 font-medium text-gray-700'>
                    Service<span className='text-red-500'>*</span>
                  </label>
                  <Field
                    as='select'
                    name='service'
                    className='border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value=''>Select Service</option>
                    {serviceOptions.map(service => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='service' component='div' className='text-red-500 text-sm' />
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-end'>
                <Button
                  variant='contained'
                  size='large'
                  onClick={() => handleSubmit(values)}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    py: 1.5,
                    px: 4
                  }}
                >
                  Search
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ReportSearchForm
