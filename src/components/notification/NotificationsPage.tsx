"use client" 
import { Box, Flex, HStack, Select, useColorMode, VStack } from '@chakra-ui/react'
import React, { useState } from 'react' 
import NotificationCard from './NotificationCard'
import CustomText from '@/components/general/Text'
import { useNotification } from '@/global-state/useNotification' 
import useCustomTheme from "@/hooks/useTheme";

interface Props {
    isLoading: boolean;
}

function NotificationPage({ isLoading }: Props) {
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

    const { setAllCount, notifications } = useNotification((state) => state);

    const menus = [
        'READ',
        'UNREAD'
    ]

    return (
        <VStack width={"full"} height={'100%'} bg={mainBackgroundColor} maxHeight={"450px"} overflowX={"hidden"} overflowY={"auto"} justifyContent={"center"} >


            <Box flex={1} width='100%' height='100%' overflowY={'auto'} px={"6"} bg={mainBackgroundColor}>
                {isLoading && (
                    <VStack width='100%'>
                        <CustomText>Loadiing....</CustomText>
                    </VStack>
                )}
                {
                    !isLoading && (
                        <>
                            {
                                notifications.map((item, index) => (
                                    <NotificationCard notification={item} key={index.toString()} />
                                ))
                            }
                        </>
                    )
                }
                {
                    !isLoading && currentPage === 1 && notifications.length < 1 && (
                        <VStack alignItems={'center'} width={'100%'} height={'70px'}>
                            No new notifications
                        </VStack>
                    )
                }

            </Box>

        </VStack>
    )
}

export default NotificationPage
