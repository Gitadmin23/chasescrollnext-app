"use client"
import { Box, Flex, HStack, Select, useColorMode, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import NotificationCard from './NotificationCard'
import CustomText from '@/components/general/Text'
import { useNotification } from '@/global-state/useNotification'
import useCustomTheme from "@/hooks/useTheme";
import useNotificationHook from '@/hooks/useNotificationHook'
import { INotification } from '@/models/Notifications'
import LoadingAnimation from '../sharedComponent/loading_animation'

interface Props {
    isLoading: boolean;
}

function NotificationPage() {
    // const [notifications, setNotificatioons] = React.useState<INotification[]>([]);
    const [page, setPage] = React.useState(0);
    const [status, setStatus] = React.useState('UNREAD');
    const [currentPage, setCurrentPage] = React.useState(0);

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    // const { setAllCount, notifications } = useNotification((state) => state); 

    const menus = [
        'READ',
        'UNREAD'
    ]

    const { results, isLoading, isRefetching } = useNotificationHook() 


    return (
        <VStack width={"full"} height={'100%'} bg={mainBackgroundColor} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"} >


            <Box flex={1} width='100%' height='100%' overflowY={'auto'} px={"6"} bg={mainBackgroundColor}>
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                    <>
                        {results.map((item: INotification, index: number) => (
                            <NotificationCard notification={item} key={index.toString()} />
                        ))}
                    </>
                </LoadingAnimation>

            </Box>

        </VStack>
    )
}

export default NotificationPage