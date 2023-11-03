"use client"
import { useDetails } from '@/global-state/useUserDetails';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { URLS } from '@/services/urls';
import { HStack, Flex, Box } from '@chakra-ui/react'; 
import React from 'react'
import ExploreEventCard from '../event_card';
import LoadingAnimation from '../loading_animation';
import { boolean } from 'zod';

interface Props {
    user_index: any,
    myevent?: boolean,
    profile?: boolean
}

function GetEventById(props: Props) {
    const {
        user_index,
        myevent,
        profile
    } = props 

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.JOINED_EVENT + user_index, limit: 10, filter: "id" })

    return (
        <HStack height={"fit-content"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"}  >
            <Box width={["full", "full", "600px"]} px={"6"} position={"relative"} >
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <ExploreEventCard my_event={myevent} profile={profile} event={event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <ExploreEventCard my_event={myevent} profile={profile} event={event} />
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </HStack>
    )
}

export default GetEventById
