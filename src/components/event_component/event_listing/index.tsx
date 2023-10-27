import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function EventListing(props: Props) {
    const { } = props

    const eventCategory = ""

    const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({ url: `/events/events${eventCategory ? "?eventType=" + eventCategory : ""}`, limit: 10, filter: "id", newdata: eventCategory })

    return (
        <Flex width={"full"} justifyContent={"center"} py={"8"} flexDirection={"column"} alignItems={"center"}   >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)','repeat(1, 1fr)','repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']} gap={5}>
                    {results?.map((event: any, i: number) => {
                        if (results.length === i + 1) {
                            return (
                                <GridItem key={event?.userId} width={"full"} ref={ref} >
                                    <ExploreEventCard page={true} event={event} />
                                </GridItem>
                            )
                        } else {
                            return (
                                <GridItem key={event?.userId} width={"full"}  >
                                    <ExploreEventCard page={true} event={event} />
                                </GridItem>
                            )
                        }
                    })}

                </Grid>
            </LoadingAnimation>
        </Flex>
    )
}

export default EventListing
