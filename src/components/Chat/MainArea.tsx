import CustomText from '@/components/general/Text';
import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import { useCommunityPageState } from './state';

function MainArea() {
    const { activeCommunity } = useCommunityPageState((state) => state);
    if (activeCommunity === null) {
        return (
            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Start Conversations</CustomText>

                <CustomText fontSize={'25px'} textAlign={'center'} fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>Gist with friends</CustomText>
            </VStack>
        )
    }
  return (
    <Box></Box>
  )
}

export default MainArea