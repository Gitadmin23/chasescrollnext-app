"use client"
import ExploreCommunity from '@/components/search_component/explore_communities'
import ExploreEvent from '@/components/search_component/explore_events'
import ExploreUser from '@/components/search_component/explore_users'
import TabController from '@/components/search_component/tab_controller'
import { INotification } from '@/models/Notifications'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Flex, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import NotificationCard from './NotificationCard'
import CustomText from '@/components/general/Text'

interface Props {}

function NotificationPage(props: Props) {
    const [notifications, setNotificatioons] = React.useState<INotification[]>([]);
    const[page, setPage] = React.useState(0);
    const [status, setStatus] =React.useState('UNREAD');

    const {isLoading, isError } = useQuery(['getNotifications', page,status], () => httpService.get(`${URLS.GET_NOTIFICATIONS}`, {
        params: {
            page,
            status: status,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<INotification> = data.data;
            console.log(item);
            setNotificatioons(item.content);
        },
        onError: () => {}
    })

    const menus = [
        'READ',
        'UNREAD'
    ]

    return (
        <VStack width={"full"} height={'100%'} bg={"white"} shadow={"lg"} roundedBottom={"lg"} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"} > 

       <Box paddingX='10px' marginTop={'10px'} width='100%'>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} width={'100%'} height={'42px'} bg='#3C41F0' color='white'>
                {menus.map((item, index) => (
                    <option key={index.toString()} value={item}>{item}</option>
                ))}
            </Select>
       </Box>

        <Box flex={1} width='100%' height='100%' overflowY={'auto'}>
            { isLoading && (
                <VStack width='100%'>
                    <CustomText>Loadiing....</CustomText>
                </VStack>
            )}
            {
                !isLoading && notifications.length > 0 && notifications.map((item, index) => (
                    <NotificationCard notification={item} key={index.toString()}  />
                ))
            }
            {
                !isLoading && notifications.length < 1 && (
                    <VStack width='100%' height='40px' justifyContent={'center'} alignItems={'center'}>
                        <CustomText>No Notification</CustomText>
                    </VStack>
                )
            }
        </Box>
            
        </VStack> 
    )
}

export default NotificationPage
