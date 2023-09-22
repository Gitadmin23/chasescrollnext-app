import CustomText from '@/components/general/Text'
import ThreadCard from '@/components/home/ThreadCard';
import { THEME } from '@/theme'
import { Avatar, Box, Flex, HStack, Textarea, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiSend, FiImage } from 'react-icons/fi';


const items = [1,2,3,4,5,6,7,8,2,3,4,5,6,7];

function Home() {
  return (
    <VStack bg='red∂' flex='1' width='100%' height='100vh' overflowY='scroll'>
      { items.map((item, i) => (
        <ThreadCard key={i.toString()} />
      ))}
    </VStack>
  )
}

export default Home