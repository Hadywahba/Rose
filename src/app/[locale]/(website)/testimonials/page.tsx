import React from 'react';
import { displayUserProfile } from '../profile/_hooks/get-profile';
import TestimonialTitle from './_components/testimonial-title';
import TestimonialForm from './_components/testimonial-form';

export default async function page() {
  const { data } = await displayUserProfile();

  return (
    <main className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-softpink-100 dark:from-zinc-900 dark:via-maroon-950 dark:to-zinc-900">
      <div className="container mx-auto grid min-h-screen grid-cols-1 gap-0 lg:grid-cols-12">
        {/* Left — Title */}
        <section className="col-span-12 border-b border-maroon-100 dark:border-maroon-900/40 lg:col-span-5 lg:border-b-0 lg:border-e">
          <TestimonialTitle />
        </section>

        {/* Right — Form */}
        <section className="col-span-12 p-6 lg:col-span-7 lg:p-10">
          <TestimonialForm user={data} />
        </section>
      </div>
    </main>
  );
}
