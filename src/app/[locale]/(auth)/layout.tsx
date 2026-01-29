import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid w-full grid-cols-1 lg:grid-cols-2">
      <section>{children}</section>
    </main>
  );
}
