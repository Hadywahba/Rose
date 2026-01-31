import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <main className="h-full w-6/12 overflow-y-hidden px-28">
        <div className="mx-auto flex  w-[25.4rem] flex-col items-center justify-center mt-1">

          {/* Children */}
          {children}

        </div>
      </main>

      {/* Right Section */}
      <section className="relative h-full w-6/12">

      </section>
    </div>
  );
}
