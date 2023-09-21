'use client'

import React from 'react';
import { Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function Home() {
 const router = useRouter();
  
 React.useEffect(() => {
  router.push('/auth')
 }, [router]);
  return (
    <VStack width='100%' height='100vh' bg='green.400'>
      <Text onClick={() => router.push('/auth')}>Hello there people</Text>
    </VStack>
  )
}
