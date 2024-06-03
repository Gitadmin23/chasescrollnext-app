/* eslint-disable react/display-name */
import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import { Chat } from '@/models/Chat'
import { IMAGE_URL, URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Avatar, Box, HStack, VStack, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useChatPageState } from './state'
import moment from 'moment'
import UserImage from '../sharedComponent/userimage'
import useCustomTheme from '@/hooks/useTheme'

interface IProps {
    chat: Chat
}

const SidebarCard = React.forwardRef<HTMLDivElement, IProps>(({ chat }, ref) => {
    const { setAll, activeChat } = useChatPageState((state) => state);
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState(`${chat?.otherUser?.firstName} ${chat?.otherUser?.lastName}`);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { isLoading } = useQuery(['getChat', chat?.id], () => httpService.get(`${URLS.GET_MESSAGE_COUNT}`, {
        params: {
            chatID: chat?.id
        }
    }), {
        onSuccess: (data) => {
            setCount(data.data);
        }
    })
    return (
        <HStack onClick={() => setAll({ activeChat: chat, messages: [], pageNumber: 0, hasNext: false })} ref={ref} width='100%' height='60px' borderRadius={'8px'} alignItems={'center'} justifyContent={'space-between'} bg={activeChat?.id === chat?.id ? secondaryBackgroundColor : mainBackgroundColor} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingRight={'10px'} cursor={'pointer'}>

            <HStack>
                <Box width={"fit-content"} overflow={'hidden'}>
                    <UserImage size={"40px"} font={"16px"}  border={"2px"} data={chat?.otherUser} image={chat?.otherUser?.data?.imgMain?.value} />
                </Box>

                <VStack alignItems={'flex-start'} spacing={0}>
                    <CustomText fontFamily={'DM-Medium'} fontSize={['12px', '14px']}>{chat?.type === 'GROUP' ? chat?.name.substring(0, 8) : name.length > 12 ? name.substring(0,12)+ '...': name}</CustomText>
                    <CustomText fontFamily={'Satoshi-Light'} fontSize={'14px'}>{chat?.lastMessage && chat?.lastMessage?.length > 10 ? chat?.lastMessage?.substring(0, 10) + '...' : chat?.lastMessage}</CustomText>
                </VStack>
            </HStack>

            <VStack alignItems={'flex-end'}>
                <CustomText fontFamily={'Satoshi-Light'} fontSize={'12px'}>{moment(chat?.lastModifiedDate).fromNow()}</CustomText>
                {isLoading && count > 0 && (
                    <VStack width='20px' height='20px' borderRadius={'10px'} justifyContent={'center'} alignItems={'center'} bg='brand.chasescrollButtonBlue' color='white'>
                        <CustomText fontSize={'10px'} color='white' fontFamily={'Satoshi-Regular'}>5</CustomText>
                    </VStack>
                )}
            </VStack>

        </HStack>
    )
})

export default SidebarCard