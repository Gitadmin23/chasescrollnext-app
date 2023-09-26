import CustomText from '@/components/general/Text'
import ThreadCard from '@/components/home/ThreadCard';
import { THEME } from '@/theme'
import { Avatar, Box, Flex, HStack, Textarea, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiSend, FiImage } from 'react-icons/fi';


const items = [1,2,3,4,5,6,7,8,2,3,4,5,6,7];

function Home() {
  return (
    <Box width="full" h={"full"} overflowY={"auto"} >
      { items.map((item, i) => (
        <ThreadCard key={i.toString()} />
      ))}
    </Box>
  )
}

export default Home