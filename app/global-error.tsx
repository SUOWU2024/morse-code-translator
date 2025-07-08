'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Application Error
            </h2>
            <p className="text-gray-600 mb-8">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors mr-4"
              >
                Try Again
              </button>
              <Link 
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
