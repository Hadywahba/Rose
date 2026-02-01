export type ResetResponse = {
  token: string;
};

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};
