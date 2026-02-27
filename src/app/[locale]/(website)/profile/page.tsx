import UpdateProfilePage from './_components/profile-card';
import { getAccessToken } from '@/lib/server/get-access-token';

async function getProfile() {
    // get token
   const accessToken = await getAccessToken();
  if (!accessToken) return null;

//   fetch profile data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/profile-data`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function Page() {
  const data = await getProfile();

  return <UpdateProfilePage initialData={data} />;
}