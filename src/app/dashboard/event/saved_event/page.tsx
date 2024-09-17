'use client'
import SearchBar from '@/components/explore_component/searchbar'
import ExploreEventCard from '@/components/sharedComponent/event_card'
import NewEventCard from '@/components/sharedComponent/event_card/newEventCard'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function SavedEvent(props: Props) {
    const { } = props

    const { search } = useSearchStore((state) => state);

    const { userId: user_index } = useDetails((state) => state);
    const { data ,results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.SAVED_EVENT + user_index+(search ? "&searchText="+search : "")+"&type=EVENT", limit: 10, filter: "id" })
 
    return (
        <Flex height={"fit-content"} flexDir={"column"} width={"full"} overflowX={"hidden"} overflowY={"auto"} alignItems={"center"}  >
            <SearchBar change={true} />
            <Box width={["full", "full", "700px"]} pt={"6"} position={"relative"} mx={"auto"} >
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            {/* <ExploreEventCard event={event} /> */}
                                            <NewEventCard {...event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            {/* <ExploreEventCard  event={event} /> */}
                                            <NewEventCard {...event} />
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </Flex>
    )
}

export default SavedEvent
