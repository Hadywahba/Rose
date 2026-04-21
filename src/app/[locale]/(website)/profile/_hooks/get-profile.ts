import { userProfile } from '@/lib/actions/profile/get-user-profile.action';

export const displayUserProfile = async () => {
  const payload = await userProfile();

  if (payload.status === false) {
    return {
      error: new Error(payload.message),
      data: null,
    };
  }

  return {
    error: null,
    data: payload.payload.user,
  };
};
