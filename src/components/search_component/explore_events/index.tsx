import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ExploreEventCard from '../../sharedComponent/event_card'

interface Props { }

function ExploreEvent(props: Props) {
    const { } = props
 
    const searchValue = ""

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/events?eventName=${searchValue}`, limit: 10, filter: "id" })
 
    return (
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
    )
}

export default ExploreEvent
