export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex flex-col">
      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        {children}
      </section>
    </main>
  );
}
