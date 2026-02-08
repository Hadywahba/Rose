'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

type EmailContextType = {
  email: string | null;
  emailState: (value: string | null) => void;
};
export const UserEmail = createContext<EmailContextType | null>(null);

export default function UserEmailProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [email, setemail] = useState<string | null>(null);
  const emailState = (value: string | null) => {
    setemail(value);
    if (value) {
      sessionStorage.setItem('user-email', value);
    } else {
      sessionStorage.removeItem('user-email');
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem('user-email');
    if (stored) {
      setemail(stored);
    }
  }, []);

  return (
    <>
      <UserEmail.Provider value={{ email, emailState }}>
        {children}
      </UserEmail.Provider>
    </>
  );
}
