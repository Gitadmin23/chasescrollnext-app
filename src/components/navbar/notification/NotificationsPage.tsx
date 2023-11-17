"use client"
import ExploreCommunity from '@/components/search_component/explore_communities'
import ExploreEvent from '@/components/search_component/explore_events'
import ExploreUser from '@/components/search_component/explore_users'
import TabController from '@/components/search_component/tab_controller'
import { INotification } from '@/models/Notifications'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Flex, HStack, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import NotificationCard from './NotificationCard'
import CustomText from '@/components/general/Text'
import { useNotification } from '@/global-state/useNotification'
import { stat } from 'fs'
import { ArrowRight2 } from 'iconsax-react'

interface Props {
    isLoading: boolean;
}

function NotificationPage({ isLoading }: Props) {
    // const [notifications, setNotificatioons] = React.useState<INotification[]>([]);
    const[page, setPage] = React.useState(0);
    const [status, setStatus] =React.useState('UNREAD');
    const [currentPage, setCurrentPage] = React.useState(0);

    const { setAllCount, notifications } = useNotification((state) => state);

    const menus = [
        'READ',
        'UNREAD'
    ]

    return (
        <VStack width={"full"} height={'100%'} bg={"white"} shadow={"lg"} roundedBottom={"lg"} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"} > 

       <Box  marginTop={'10px'} width='100%'>
        <HStack cursor={'ppinter'} onClick={() => setCurrentPage(prev => prev === 0 ?1:0)} paddingX='10px' borderBottomWidth={'0.8px'} borderBottomColor={'lightgrey'} width='100%' height={'30px'} justifyContent='space-between'>
           { currentPage === 0 && (
            <>
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='black'>New</CustomText>
                <ArrowRight2 size='20px' variant='Outline' color='black' />
            </>
           )}
           { currentPage === 1 && (
            <>
                <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='black'>Read</CustomText>
                <ArrowRight2 size='25px' variant='Outline' color='black' />
            </>
           )}
        </HStack>
     
       </Box>

        <Box flex={1} width='100%' height='100%' overflowY={'auto'}>
            { isLoading && (
                <VStack width='100%'>
                    <CustomText>Loadiing....</CustomText>
                </VStack>
            )}
            {
                !isLoading && notifications.length > 0 && currentPage === 1 && notifications.filter((item) => item.status === 'UNREAD').map((item, index) => (
                    <NotificationCard notification={item} key={index.toString()}  />
                ))
            }
             {
                !isLoading && notifications.length > 0 && currentPage === 0 && notifications.filter((item) => item.status === 'READ').map((item, index) => (
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
