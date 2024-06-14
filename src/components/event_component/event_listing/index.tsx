import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    limit?: boolean
}

function EventListing(props: Props) {
    const {
        limit
    } = props
    const { event_category } = useSearchStore((state) => state);

    const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({ url: `/events/events${event_category ? "?eventType=" + event_category : ""}`, limit: limit ? 9 : 10, filter: "id", newdata: event_category })

    return (
        <Flex width={"full"} justifyContent={"center"} mt={!event_category ? !limit ? "8" : "" : ""} py={"8"} px={"6px"} flexDirection={"column"} alignItems={"center"} >
            {!limit && (
                <Text fontWeight={"semibold"} textAlign={!event_category ? "left" : "center"} fontSize={"20px"} mt={"15px"} mb={"10px"} mr={!event_category ? "auto" : ""} ml={!event_category ? "12px" : ""} >{!event_category ? "Trending" : event_category?.split("_")?.join(" ")}</Text>
            )}
            <LoadingAnimation loading={isLoading} customLoader={
                <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}> 
                    <GridItem maxWidth={["500px", "500px", "500px", "500px", "500px"]}  >
                        <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                    </GridItem>
                    <GridItem maxWidth={["500px", "500px", "500px", "500px", "500px"]}  >
                        <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                    </GridItem>
                    <GridItem maxWidth={["500px", "500px", "500px", "500px", "500px"]}  >
                        <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                    </GridItem>
                    <GridItem maxWidth={["500px", "500px", "500px", "500px", "500px"]}  >
                        <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                    </GridItem>
                    <GridItem maxWidth={["500px", "500px", "500px", "500px", "500px"]}  >
                        <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                    </GridItem>
                </Grid>
            } refeching={isRefetching} length={results?.length} >
                <>
                    {!limit && (
                        <Grid width={["fit", "fit", "auto", "auto", "auto"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <GridItem key={i} maxWidth={["full", "full", "500px", "500px", "500px"]} ref={ref} >
                                            <ExploreEventCard landing={true} date={true} page={true} event={event} />
                                        </GridItem>
                                    )
                                } else {
                                    return (
                                        <GridItem key={i} maxWidth={["full", "full", "500px", "500px", "500px"]}  >
                                            <ExploreEventCard landing={true} date={true} page={true} event={event} />
                                        </GridItem>
                                    )
                                }
                            })}
                        </Grid>
                    )}
                    {limit && (
                        <Grid width={["fit", "fit", "auto", "auto", "auto"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                            {results?.map((event: any, i: number) => {
                                return (
                                    <GridItem key={i} maxWidth={["full", "full", "500px", "500px", "500px"]}  >
                                        <ExploreEventCard landing={limit} date={true} page={true} event={event} />
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    )}
                </>
            </LoadingAnimation>
        </Flex>
    )
}

export default EventListing
