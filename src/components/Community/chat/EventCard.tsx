import CustomText from '@/components/general/Text'
import { IEvent } from '@/models/Events'
import { IMAGE_URL } from '@/services/urls'
import { THEME } from '@/theme'
import { Box, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import { FiMapPin } from 'react-icons/fi'

function EventCard({
    event
}: { event?: IEvent }) {
  return (
    <VStack display={'inline-block'} overflow={'hidden'} flexWrap={'wrap'} whiteSpace={'nowrap'} marginBottom={'20px'} marginRight={'20px'} width={'82px'} height='73px' borderRadius={'8px 0px 8px 8px'} borderWidth={'0.8px'} borderColor={'lightblue'} padding='2px'>
        <Box width='100%' height='60%' bg='lightgrey' borderRadius={'5px'}>
          <Image alt='om' src={`${IMAGE_URL}${event?.currentPicUrl}`} width='100%' height='100%' objectFit={'cover'} />
        </Box>

        <CustomText fontFamily={'DM-Bold'} width={'100%'} wordBreak={'break-word'} color='black' fontSize={'10px'}>{event?.eventName}</CustomText>
        {/* <HStack>
            <FiMapPin color={THEME.COLORS.chasescrollButtonBlue} fontSize='7px'  />
            <CustomText color={THEME.COLORS.chasescrollButtonBlue} fontSize='8px'>{event?.location.address}</CustomText>
        </HStack> */}
    </VStack>
  )
}

export default EventCard