import AuthAside from '@/components/layout/auth/auth-aside';
import AuthLocaleToggle from '@/components/layout/auth/auth-locale-toggle';
import DecorativeOrnament from '@/components/shared/home/decorative-ornament';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
      {/* Left Side - Auth Forms */}
      <div className="w-full justify-center flex flex-col px-4 py-8 lg:py-0 b">
        <div className="w-full max-w-[25.375rem] mx-auto ">
          {/* Language Toggle */}
          <div className={`mb-8 flex justify-end`}>
            <AuthLocaleToggle />
          </div>

          {/* Content */}
          <DecorativeOrnament position="top" />
          {children}
          <DecorativeOrnament position="bottom" />
        </div>
      </div>

      {/* Right Side - Decorative Image */}
      <div className="overflow-hidden hidden lg:flex lg:items-center lg:justify-center">
        <AuthAside />
      </div>
    </div>
  );
}
