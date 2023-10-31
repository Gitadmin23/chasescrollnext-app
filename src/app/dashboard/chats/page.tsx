'use client';
import MainArea from '@/components/Chat/MainArea';
import Sidebar from '@/components/Chat/Sidebar';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React from 'react'

function Chat() {
  return (
    <HStack width={'100%'} height='100%' spacing={0} padding='5px'>
        <Box width={'30%'} height={'100%'} >
            <Sidebar />
        </Box>
        <VStack flex={1} height='100%' bg='white' borderWidth={1} borderColor='brand.chasescrollButtonBlue' borderRadius={'20px'} overflow='hidden'>
            <MainArea />
        </VStack>
    </HStack>
  )
}

export default Chat