import Image from 'next/image';

export default function AuthAside() {
  return (
    <>
      <Image
        src="/images/auth-images/aside-auth-img.png"
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />
    </>
  );
}
