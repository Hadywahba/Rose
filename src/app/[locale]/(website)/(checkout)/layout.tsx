import React from 'react';

export default function layout({
  children,
  summary,
}: Readonly<{
  children: React.ReactNode;
  summary: React.ReactNode;
}>) {
  return (
    <main className="grid w-full grid-cols-1 gap-10 pt-16 lg:grid-cols-12 lg:px-20 min-h-screen px-4 md:px-0">
      {/* Children */}
      <section className="mx-auto w-full lg:col-span-7 lg:max-w-[48.875rem] xl:max-w-none ">
        {children}
      </section>

      {/* Parallel Route */}
      <aside className="mx-auto w-full lg:col-span-5 lg:max-w-[28.625rem]">
        {summary}
      </aside>
    </main>
  );
}
