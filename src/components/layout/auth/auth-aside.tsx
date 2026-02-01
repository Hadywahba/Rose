import Image from 'next/image';

export default function AuthAside() {
  return (
    <div className="relative hidden h-full w-full lg:block">
      <Image
        src="/images/auth-images/aside-auth-img.png"
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
