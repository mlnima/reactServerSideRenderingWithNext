'use client';
import { useEffect } from 'react'
import './error.scss'

export default function Error(
  {
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log('error page')
    console.error(JSON.stringify(error))
  }, [error])
  return (
    // global-error must include html and body tags
    <html>
    <body>
    <div className={'errorPage'}>
      <h1>Something went wrong Please try again later</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>

    </body>
    </html>
  );
}