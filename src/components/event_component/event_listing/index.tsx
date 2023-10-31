import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function EventListing(props: Props) {
    const { } = props

    const eventCategory = ""

    const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({ url: `/events/events${eventCategory ? "?eventType=" + eventCategory : ""}`, limit: 10, filter: "id", newdata: eventCategory })

    return (
        <Flex width={"full"} justifyContent={"center"} py={"8"} px={"6px"} flexDirection={"column"} alignItems={"center"} >
            <Text fontWeight={"semibold"} fontSize={"20px"} mt={"15px"} mb={"10px"} mr={"auto"} ml={"12px"} >Trending</Text>
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                <Grid width={["fit", "fit", "auto", "auto", "auto"]}  templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                    {results?.map((event: any, i: number) => {
                        if (results.length === i + 1) {
                            return (
                                <GridItem key={event?.userId} maxWidth={["full", "full", "500px", "500px", "500px"]} ref={ref} >
                                    <ExploreEventCard date={true} page={true} event={event} />
                                </GridItem>
                            )
                        } else {
                            return (
                                <GridItem key={event?.userId} maxWidth={["full", "full", "500px", "500px", "500px"]}  >
                                    <ExploreEventCard date={true} page={true} event={event} />
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
