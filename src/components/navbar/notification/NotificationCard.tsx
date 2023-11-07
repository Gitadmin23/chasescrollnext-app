import CustomText from '@/components/general/Text'
import { INotification } from '@/models/Notifications'
import { Avatar, Box, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { IMAGE_URL } from '@/services/urls';

function NotificationCard({ notification }: {
    notification: INotification
}) {
  return (
    <HStack alignItems={'center'} spacing={0} justifyContent={'space-between'} width='100%' height={'auto'} paddingY={'10px'} borderBottomWidth={'1px'} borderBottomColor='lightgrey' paddingX='10px'>
        <Box width='32px' height='32px' borderRadius={'36px 0px 36px 36px'} borderWidth={'1px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
          {notification?.recieverID?.data?.imgMain?.value === null && (
            <VStack color='brand.chasescrollButtonBlue' justifyContent={'center'} alignItems='center'>
              <CustomText color='brand.chasescrollButtonBlue' fontSize={'18px'} fontFamily={'DM-Bold'}>{notification.recieverID.firstName[0].toUpperCase()} {notification.recieverID.lastName[0].toUpperCase()}</CustomText>
            </VStack>
          )}
          {notification?.recieverID?.data?.imgMain?.value !== null && (
            <Image alt='img' src={`${IMAGE_URL}${notification?.recieverID?.data?.imgMain?.value}`} width='100%' height={'100%'} objectFit={'cover'} />
          )}
        </Box>
        <VStack alignItems={'flex-start'} spacing={0} flex={1} paddingX='10px'>
            <CustomText fontSize={'14px'} fontFamily={'DM-Medium'} color='brand.chasescrollButtonBlue'>{notification.title}</CustomText>
            <CustomText fontSize={'14px'} fontFamily={'DM-Regular'} width='100%'>{notification.message}</CustomText>
        </VStack>
        <CustomText fontSize={'12px'} fontFamily={'DM-Regular'}>{moment(notification.createdDate).fromNow(false)}</CustomText>
    </HStack>
  )
}

export default NotificationCard