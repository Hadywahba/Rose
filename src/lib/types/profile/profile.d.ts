declare type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE';
  photo: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER' | 'ADMIN' | string;
  createdAt: string;
  updatedAt: string;
};

declare type  UserResponsePayload = {
  user: User;
}
