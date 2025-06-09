'use client'

import { useReportWebVitals } from 'next/web-vitals'

const logWebVitals = (metric) => {
  console.log(metric)
}

export function WebVitals() {
  useReportWebVitals(logWebVitals)

  return null
}