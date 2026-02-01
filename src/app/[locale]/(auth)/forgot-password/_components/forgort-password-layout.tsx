'use client';

import { FORGOT_PASSWORD_STEPS } from '@/lib/constants/auth.constant';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { useState } from 'react';
import ForgotPasswordForm from './forgot-password-form';
import VerifyPasswordForm from './verify-password-form';
import ResetPasswordForm from './reset-password-form';

export default function ForgotPasswordLayout() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEPS.email,
  );
  // steps to tender components
  const steps = {
    [FORGOT_PASSWORD_STEPS.email]: {
      form: <ForgotPasswordForm />,
    },
    [FORGOT_PASSWORD_STEPS.verify]: {
      form: <VerifyPasswordForm />,
    },
    [FORGOT_PASSWORD_STEPS.reset]: {
      form: <ResetPasswordForm />,
    },
  };

  return <>{steps[step].form}</>;
}
