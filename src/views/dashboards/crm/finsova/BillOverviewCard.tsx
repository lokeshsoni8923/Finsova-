'use client'

import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'

// Lazy load ApexCharts
const ApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'), { ssr: false })

// Type safety for chart types
type ChartType =
  | 'bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap'

const BillingSummary = () => {
  const theme = useTheme()
  const actionSelected = 'var(--mui-palette-action-selected)'

  // Chart options for different types
  const barOptions: ApexOptions = {
    chart: { sparkline: { enabled: true }, toolbar: { show: false } },
    tooltip: { enabled: false },
    colors: ['#FFB400'],
    dataLabels: { enabled: false },
    grid: { show: false },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
        colors: { backgroundBarColors: new Array(7).fill(actionSelected) }
      }
    },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false }
  }

  const lineOptions: ApexOptions = {
    chart: { sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#00E396'],
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    grid: { show: false },
    tooltip: { enabled: false },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false }
  }

  const columnOptions: ApexOptions = {
    chart: { type: 'bar', sparkline: { enabled: true }, toolbar: { show: false } },
    colors: ['#00C896'],
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    grid: { show: false },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '25%',
        distributed: true
      }
    },
    xaxis: { labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false }
  }

  // Data for cards
  const cards: {
    title: string
    sub: string
    amount: string
    trend: string
    trendColor: string
    chart: {
      type: ChartType
      series: ApexOptions['series']
      options: ApexOptions
    }
  }[] = [
    {
      title: "This Month's Debit",
      sub: 'vs last month',
      amount: '₹9,120',
      trend: '+8.4%',
      trendColor: 'success.main',
      chart: {
        type: 'bar',
        series: [{ data: [1200, 980, 1340, 1100, 1580, 1400, 1620] }],
        options: barOptions
      }
    },
    {
      title: "This Quarter's Debit",
      sub: 'vs previous quarter',
      amount: '₹24,500',
      trend: '+5.2%',
      trendColor: 'success.main',
      chart: {
        type: 'line',
        series: [{ data: [8200, 7900, 8400, 7400, 8100, 9100, 9000] }],
        options: lineOptions
      }
    },
    {
      title: 'Year-to-Date Bills Paid',
      sub: 'since Jan 1',
      amount: '₹76,300',
      trend: '+12.1%',
      trendColor: 'success.main',
      chart: {
        type: 'bar',
        series: [{ data: [10500, 9800, 11500, 10200, 9300, 8900, 9600] }],
        options: barOptions
      }
    },
    {
      title: 'Total Credit',
      sub: 'cashback/refunds',
      amount: '₹2,430',
      trend: '-3.4%',
      trendColor: 'error.main',
      chart: {
        type: 'bar',
        series: [{ data: [800, 650, 720, 480, 760, 590, 430] }],
        options: columnOptions
      }
    }
  ]

  return (
    <Grid container spacing={6}>
      {cards.map((item, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardHeader title={item.title} subheader={item.sub} className='pbe-0' />
            <CardContent className='flex flex-col'>
              <ApexCharts
                type={item.chart.type}
                height={84}
                width='100%'
                options={item.chart.options}
                series={item.chart.series}
              />
              <div className='flex items-center justify-between flex-wrap gap-x-4 gap-y-0.5'>
                <Typography variant='h4' color='text.primary'>
                  {item.amount}
                </Typography>
                <Typography variant='body2' color={item.trendColor}>
                  {item.trend}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default BillingSummary
