import { authOption } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react'
import HeaderMobile from './header-mobile';
import { User } from '@/lib/types/auth';

export default async function HeaderUserName() {
     const session = await getServerSession(authOption);
  return (
    <>
      <HeaderMobile user={(session?.user as User) ?? null}/>
    </>
  )
}
