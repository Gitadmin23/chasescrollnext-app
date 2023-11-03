import CustomText from '@/components/general/Text'
import { IEvent } from '@/models/Events'
import { THEME } from '@/theme'
import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiMapPin } from 'react-icons/fi'

function EventCard({
    event
}: { event?: IEvent }) {
  return (
    <VStack display={'inline-block'} whiteSpace={'nowrap'} marginBottom={'20px'} marginRight={'20px'} width={'82px'} height='73px' borderRadius={'8px 0px 8px 8px'} borderWidth={'0.8px'} borderColor={'lightblue'} padding='2px'>
        <Box width='100%' height='60%' bg='lightgrey' borderRadius={'5px'}></Box>
        <CustomText fontFamily={'DM-Medium'} color='black' fontSize={'8px'}>Libero interdum</CustomText>
        <HStack>
            <FiMapPin color={THEME.COLORS.chasescrollButtonBlue} fontSize='7px'  />
            <CustomText color={THEME.COLORS.chasescrollButtonBlue} fontSize='8px'>Island house</CustomText>
        </HStack>
    </VStack>
  )
}

export default EventCard