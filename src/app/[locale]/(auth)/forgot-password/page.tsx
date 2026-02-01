import React, { Suspense } from 'react';

import ResetPasswordForm from './_components/reset-password-form';
import ForgotPasswordForm from './_components/forgot-password-form';
import VerifyPasswordForm from './_components/verify-password-form';

export default function page() {
  return (
    <>
      <ForgotPasswordForm />
      <VerifyPasswordForm/>
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}

