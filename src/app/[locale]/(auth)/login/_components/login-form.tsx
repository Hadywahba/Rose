'use client';

import React, { useState } from 'react';
import RememberMe from './remeber-me';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react'

export default function LoginForm() {

   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    await signIn('credentials', {
      email,
      password,
      rememberMe,
      redirect: true,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <div>
      <RememberMe checked={rememberMe} onChange={setRememberMe} />
      <Button onClick={handleLogin} className="mt-4 w-full">
        Login
      </Button>
    </div>
  );
}
