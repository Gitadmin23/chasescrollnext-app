'use client';
import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode,
}

function ShareLayout({
  children
}: Props) {
  const router = useRouter();
  React.useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId || userId === '') {
      router.push('/share/auth/login')
    }
  }, [router])
  return (
    <VStack width={'100%'} height={'100vh'} alignItems={'center'}>
      <Box width={['100%', '100%']}  height='100%' bg='red' overflowY={'auto'}>
        { children }
      </Box>
    </VStack>
  )
}

export default ShareLayout