import { userProfile } from '@/lib/actions/profile/get-user-profile.action';

export const displayUserProfile = async () => {
  const payload = await userProfile();

  if (payload.status === false) {
    throw new Error(payload.message);
  }

  return payload.payload;
};
