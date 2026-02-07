'use client';

import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <h1 className="text-9xl font-extrabold text-maroon-600 dark:text-softpink-600">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Page not found
      </h2>
      <p className="mt-2 max-w-md text-center text-gray-600 dark:text-gray-400">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-maroon-600 px-6 py-3 text-white shadow transition hover:bg-maroon-700 dark:bg-softpink-600 dark:text-zinc-50 dark:hover:bg-softpink-500"
      >
        Go back home
      </Link>
    </div>
  );
}
