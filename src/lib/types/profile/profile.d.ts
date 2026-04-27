declare type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  photo: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER' | 'ADMIN' | string;
  createdAt: string;
  updatedAt: string;
};

declare type UserResponsePayload = {
  user: User;
};

declare type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  phone: string;
  photo?: string | null;
};

declare type UpdateProfileResponse = {
  user: User;
};
