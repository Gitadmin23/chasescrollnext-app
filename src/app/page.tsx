'use client'

import React from 'react';
import { Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
 const router = useRouter();
  
 React.useEffect(() => {
  router.push('/auth')
 }, [router]);
  return (
    <VStack width='100%' height='100vh' justifyContent={'center'} alignItems={'center'} >
      <Image src='/assets/images/chasescroll-logo.png' width={200} height={200} alt='logo' />
    </VStack>
  )
}
