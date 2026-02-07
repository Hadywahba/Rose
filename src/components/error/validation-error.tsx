import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface Props {
  errors: FieldErrors;
  name: string;
}

const ValidationError = ({ errors, name }: Props) => {
  const getNestedError = (obj: unknown, path: string) => {
    return path.split('.').reduce((acc: unknown, key: string) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  };

  const errorMessage = (getNestedError(errors, name) as { message?: string })
    ?.message;

  if (!errorMessage) return null;

  return <div className="bg- mt-2 text-xs text-red-500">{errorMessage}</div>;
};

export default ValidationError;
