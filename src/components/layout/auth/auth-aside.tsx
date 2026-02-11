import Image from 'next/image';

export default function AuthAside() {
  return (
    <>
      <Image
        src="/images/aside-auth-img.png"
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />
    </>
  );
}
