import AuthAside from '@/components/layout/auth/auth-aside';
import AuthLocaleToggle from '@/components/layout/auth/auth-locale-toggle';
import DecorativeOrnament from '@/components/shared/home/decorative-ornament';


export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Auth Forms */}
      <div className="flex w-full flex-col justify-center px-4 py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[25.375rem]">
          {/* Language Toggle */}
          <div className="mb-8 flex justify-end">
            <AuthLocaleToggle />
          </div>

          {/* Top Decorative Ornament */}
          <DecorativeOrnament position="top" />

          {/* Children (Auth Form) */}
          {children}

          {/* Bottom Decorative Ornament */}
          <DecorativeOrnament position="bottom" />
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden lg:block">
       <AuthAside/>
      </div>
    </div>
  );
}
