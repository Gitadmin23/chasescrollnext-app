import CustomText from '@/components/general/Text'
import { Avatar, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    
}

function SidebarCard() {
  return (
   <HStack width='100%' height='100px' borderRadius={'0px'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'}>

    <HStack>
        <Avatar name='daniel ema' size={'sm'} />

        <VStack alignItems={'flex-start'}>
            <CustomText fontFamily={'Satoshi-Regular'} fontSize={'18px'}>Otuekong Archibong</CustomText>
            <CustomText fontFamily={'Satoshi-Light'} fontSize={'14px'}>what ahppened to you yesterday</CustomText>
        </VStack>
    </HStack>

    <VStack alignItems={'flex-end'}>
        <CustomText fontFamily={'Satoshi-Light'} fontSize={'12px'}>10:27PM</CustomText>
        <VStack width='20px' height='20px' borderRadius={'10px'} justifyContent={'center'} alignItems={'center'} bg='brand.chasescrollButtonBlue' color='white'>
            <CustomText fontSize={'10px'} color='white' fontFamily={'Satoshi-Regular'}>5</CustomText>
        </VStack>
    </VStack>
   
   </HStack>
  )
}

export default SidebarCard