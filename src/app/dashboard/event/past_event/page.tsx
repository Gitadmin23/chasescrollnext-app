'use client'
import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation' 
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function PastEvent(props: Props) {
    const { } = props
 
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.PAST_EVENT, limit: 10, filter: "id" })

    return (
        <HStack height={"fit-content"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"}  >
            <Box width={["full", "full", "700px"]} px={"6"} position={"relative"} >
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <ExploreEventCard event={event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <ExploreEventCard event={event} />
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

export default PastEvent
