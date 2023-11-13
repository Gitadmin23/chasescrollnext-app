import LoginPage from '@/Views/auth/page'
import { getServerSession } from 'next-auth'
import React from 'react'

async function Auth() {
  return (
    <LoginPage />
  )
}

export default Auth