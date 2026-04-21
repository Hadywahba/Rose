import React from 'react';
import { displayUserProfile } from './_hooks/get-profile';

export default async function page() {
  const x = await displayUserProfile();
  console.log(x.user);
  return <div>ggsg</div>;
}
