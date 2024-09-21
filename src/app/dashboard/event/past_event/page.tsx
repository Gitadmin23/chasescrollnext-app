'use client'
import SearchBar from '@/components/explore_component/searchbar'
import ExploreEventCard from '@/components/sharedComponent/event_card'
import NewEventCard from '@/components/sharedComponent/event_card/newEventCard'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function PastEvent(props: Props) {
    const { } = props

    const { search } = useSearchStore((state) => state);

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.PAST_EVENT + (search ? "?searchText="+search : "") , limit: 10, filter: "id" })

    return (
        <HStack height={"fit-content"} display={"flex"} flexDir={"column"} width={"full"} overflowY={"auto"} overflowX={"hidden"} justifyContent={"center"}  >
            <SearchBar change={true} event={true}/>
            <Box width={["full", "full", "700px"]} position={"relative"} pt={"6"} >
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            {/* <ExploreEventCard past={true} event={event} /> */}
                                            <NewEventCard {...event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            {/* <ExploreEventCard past={true} event={event} /> */}
                                            <NewEventCard {...event} />
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
