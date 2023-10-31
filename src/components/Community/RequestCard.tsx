import { ICommunity } from '@/models/Communitty'
import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text';

interface IProps {
    community: ICommunity;
}

function RequestCard({ community }: IProps) {
  return (
    <HStack width={'100%'} height={'30px'}>
        <Box width='70%' borderWidth={'2px'} borderBottomLeftRadius={'20px'} borderBottomRadius={'20px'} borderTopLeftRadius={'20px'} overflow={'hidden'}></Box>

        <VStack width={'30%'} height='100%'>
            <CustomText fontFamily={'Satoshi-Bold'} fontSize={'20px'}>{community?.data?.name}</CustomText>
            <CustomText fontFamily={'Satoshi-Regular'} fontSize={'16px'}>{community?.data?.description}</CustomText>
                <HStack>
                    <Button variant={'solid'} height='40px' bg='brand.chasescrollButtonBlue'>Accept</Button>
                    <Button variant={'outline'} outlineColor={'brand.chasescrollButtonBlue'} height='40px' bg='brand.chasescrollButtonBlue' color='red'>Decline</Button>
                </HStack>
        </VStack>
    </HStack>
  )
}

export default RequestCard