import Image from 'next/image';

export default function AuthAside() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center shrink-0">
      <Image
        src="/images/auth-images/aside-auth-img.png"
        alt="Auth background"
        width={740}
        height={1024}
        className=" w-full "
        priority
      />
    </div>
  );
}
