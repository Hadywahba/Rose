import React, { Suspense } from 'react';

import ResetPasswordForm from './_components/reset-password-form';
import ForgotPasswordForm from './_components/forgot-password-form';

export default function page() {
  return (
    <div>
      <ForgotPasswordForm />
      <Suspense fallback={<p>Loading...</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
