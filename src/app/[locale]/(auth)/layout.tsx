import AuthAside from '@/components/layout/auth/auth-aside';
import AuthLocaleToggle from '@/components/layout/auth/auth-locale-toggle';
import DecorativeOrnament from '@/components/ui/decorative-ornament';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen w-full ">
      {/* Left Side - Auth Forms */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-lg py-12 overflow-hidden">
          {/* Language Toggle */}
          <div className={`mb-10 flex justify-end`}>
            <AuthLocaleToggle />
          </div>

          {/* Content */}
          <DecorativeOrnament position="top" />
          {children}
          <DecorativeOrnament position="bottom" />
        </div>
      </div>

      {/* Right Side - Decorative Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <AuthAside />
      </div>
    </div>
  );
}
