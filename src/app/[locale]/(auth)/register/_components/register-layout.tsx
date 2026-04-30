'use client';

import { Register_STEPS } from '@/lib/constants/register.constant';
import { RegisterSteps } from '@/lib/types/auth/register/register-steps';
import { useState } from 'react';
import RegisterEmailVerify from './register-email-verify';
import RegisterCodeVerify from './register-code-verify';
import { RegisterForm } from './register-form';

export default function RegisterLayout() {
  // State
  const [step, setSteps] = useState<RegisterSteps>(Register_STEPS.email);

  // Type-safe steps
  const steps: Record<RegisterSteps, JSX.Element> = {
    [Register_STEPS.email]: <RegisterEmailVerify setStep={setSteps} />,
    [Register_STEPS.verify]: <RegisterCodeVerify setStep={setSteps} />,
    [Register_STEPS.register]: <RegisterForm />,
  };

  return steps[step];
}
