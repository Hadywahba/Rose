import UserEmailProvider from '@/components/providers/app/forget-password/email-provider';
import RegisterLayout from './_components/register-layout';


export default function RegisterPage() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <UserEmailProvider>
        <RegisterLayout />
      </UserEmailProvider>
    </main>
  );
}
