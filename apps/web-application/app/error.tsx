'use client';
import { useEffect } from 'react'

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
    <h2>Something went wrong!</h2>
    <button onClick={() => reset()}>Try again</button>
    </body>
    </html>
  );
}