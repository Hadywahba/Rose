export type RegisterResponse = {
  token: string;
  user: User['user'];
};

export type RegisterFields = z.infer<typeof registerSchema>;
