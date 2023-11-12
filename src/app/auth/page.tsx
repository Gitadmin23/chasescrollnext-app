import LoginPage from '@/Views/auth/page'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Auth() {
  const session = await getServerSession();
  return (
    <LoginPage session={session} />
  )
}

export default Auth