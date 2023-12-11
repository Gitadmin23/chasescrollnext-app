'use client'

import React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import EventComponent from '@/components/event_component';

export default function Home() {
 const router = useRouter();
  
 React.useEffect(() => {  
  router.push('/auth');
 }, [router]);
  return (
    // <Flex width={"full"} >
      
    //   <EventComponent />
    // </Flex>
    <VStack width='100%' height='100vh' justifyContent={'center'} alignItems={'center'} >
      <Image src='/assets/images/chasescroll-logo.png' width={200} height={200} alt='logo' />
    </VStack>
  )
}
