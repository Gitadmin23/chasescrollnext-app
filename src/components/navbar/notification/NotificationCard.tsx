import CustomText from '@/components/general/Text'
import { INotification } from '@/models/Notifications'
import { Avatar, Box, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { IMAGE_URL } from '@/services/urls';
import { useRouter } from 'next/navigation';
import { useDetails } from '@/global-state/useUserDetails';

function NotificationCard({ notification }: {
    notification: INotification
}) {
  const router = useRouter();
  const { userId } = useDetails((state) => state);
  console.log(notification?.recieverID);

  const handleClick = () => {
    switch(notification.type) {
      case 'CHAT': {
          router.push(`/dashboard/chats?activeID=${notification.typeID}`);
          break;
      }
      case 'EVENT': {
        router.push(`/dashboard/event/details/${notification.typeID}`);
        break;
      }
      case 'FRIEND_REQUEST': {
        router.push(`/dashboard/profile/${userId}/network?tab=request`);
        break;
      }
      case 'GROUP_REQUEST': {
        router.push(`/dashboard/community?tab=request`);
        break;
      }
      case 'GROUP': {
        router.push(`/dashboard/community?activeID=${notification.typeID}`);
        break;
      }
      default:{
        break;
      }
    }
  }
  return (
    <HStack bg={notification.status === 'READ' ? 'lightgrey':'white'} onClick={handleClick} alignItems={'center'} spacing={0} justifyContent={'space-between'} width='100%' height={'auto'} paddingY={'10px'} borderBottomWidth={'1px'} borderBottomColor='lightgrey' paddingX='10px'>
        <Box width='32px' height='32px' borderRadius={'36px 0px 36px 36px'} borderWidth={'1px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
          {!notification?.recieverID?.data?.imgMain?.value && (
            <VStack width='100%' height='100%' color='red' bg='red' justifyContent={'center'} alignItems='center'>
              <CustomText color='red' fontSize={'18px'} fontFamily={'DM-Bold'}>{notification?.recieverID?.firstName[0].toUpperCase()} {notification?.recieverID?.lastName[0].toUpperCase()}</CustomText>
            </VStack>
          )}
          {notification?.recieverID?.data?.imgMain?.value && (
            <>
              { notification?.recieverID?.data.imgMain.value.startsWith('https://') && <Image alt='img' src={`${notification?.recieverID?.data?.imgMain?.value}`} width='100%' height={'100%'} objectFit={'cover'} /> }

              { !notification?.recieverID?.data.imgMain.value.startsWith('https://') && <Image alt='img' src={`${IMAGE_URL}${notification?.recieverID?.data?.imgMain?.value}`} width='100%' height={'100%'} objectFit={'cover'} /> }
            </>
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