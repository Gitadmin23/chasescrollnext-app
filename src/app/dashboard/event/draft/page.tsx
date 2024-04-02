'use client'
import SearchBar from '@/components/explore_component/searchbar'
import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function Draft(props: Props) {
    const { } = props

    const { search } = useSearchStore((state) => state);
  
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_DRAFT + (search ? "?searchText="+search : ""), limit: 10, filter: "id" })
  

    return (
        <HStack height={"fit-content"} display={"flex"} width={"full"} flexDir={"column"} overflowY={"auto"} justifyContent={"center"}  >
            <SearchBar change={true} />
            <Box width={["full", "full", "700px"]} position={"relative"} >
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <ExploreEventCard draft={true} event={event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <ExploreEventCard draft={true} event={event} />
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

export default Draft
