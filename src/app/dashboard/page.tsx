'use client';

import React from 'react'
import { useRouter } from 'next/navigation'

function Home() {
    const router = useRouter()

    React.useEffect(() => {
        router.push('/dashboard/home')
    }, [router]);
  return (
    <div>Home</div>
  )
}

export default Home