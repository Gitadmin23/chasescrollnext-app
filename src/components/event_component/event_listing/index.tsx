import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { Box, Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'

interface Props {
    limit?: boolean,
    size?: number
}

function EventListing(props: Props) {
    const {
        limit,
        size
    } = props
    const { event_category } = useSearchStore((state) => state);

    const InfiniteComponent = () => {

        const { results, isLoading, ref, refetch, isRefetching } = InfiniteScrollerComponent({ url: `/events/events${event_category ? "?eventType=" + event_category : ""}`, limit: limit ? 50 : 10, filter: "id", newdata: event_category })

        return (
            <Flex width={"full"} justifyContent={"center"} mt={!event_category ? !limit ? "8" : "" : ""} py={"8"} px={"6px"} flexDirection={"column"} alignItems={"center"} >
                {!limit && (
                    <Text fontWeight={"semibold"} textAlign={!event_category ? "left" : "center"} fontSize={"20px"} mt={"15px"} mb={"10px"} mr={!event_category ? "auto" : ""} ml={!event_category ? "12px" : ""} >{!event_category ? "Trending" : event_category?.split("_")?.join(" ")}</Text>
                )}
                <LoadingAnimation loading={isLoading} customLoader={
                    <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                    </Grid>
                } refeching={isRefetching} length={results?.length} >
                    <>
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <GridItem key={i} w={["full", "full", "full", "full", "full"]} ref={ref} >
                                            <ExploreEventCard landing={true} date={true} page={true} event={event} />
                                        </GridItem>
                                    )
                                } else {
                                    return (
                                        <GridItem key={i} w={["full", "full", "full", "full", "full"]}  >
                                            <ExploreEventCard landing={true} date={true} page={true} event={event} />
                                        </GridItem>
                                    )
                                }
                            })}
                        </Grid>
                    </>
                </LoadingAnimation>
            </Flex>
        )
    }
    const LimitedComponent = () => {


        // react query
        const { data, isLoading, isRefetching } = useQuery(['eventdata', size], () => httpService.get(`/events/events${event_category ? "?eventType=" + event_category : ""}`, {
            params: {
                size: size,
            }
        }), {
            onError: (error: any) => {
                // toast({
                //     status: "error",
                //     title: error.response?.data,
                // });
            },
            onSuccess: (data) => {
                // setData(data.data);
            }
        })

        console.log(data);
        

        return (
            <Flex width={"full"} justifyContent={"center"} mt={!event_category ? !limit ? "8" : "" : ""} py={"8"} px={"6px"} flexDirection={"column"} alignItems={"center"} >
                {!limit && (
                    <Text fontWeight={"semibold"} textAlign={!event_category ? "left" : "center"} fontSize={"20px"} mt={"15px"} mb={"10px"} mr={!event_category ? "auto" : ""} ml={!event_category ? "12px" : ""} >{!event_category ? "Trending" : event_category?.split("_")?.join(" ")}</Text>
                )}
                <LoadingAnimation loading={isLoading} customLoader={
                    <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                        <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"400px"} />
                        </GridItem>
                    </Grid>
                } refeching={isRefetching} length={data?.data?.content?.length} >
                    <>
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']} gap={5}>
                            {data?.data?.content?.map((event: any, i: number) => {
                                return (
                                    <GridItem key={i} w={["full", "full", "full", "full", "full"]}  >
                                        <ExploreEventCard limit={true} landing={limit} date={true} page={true} event={event} />
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    </>
                </LoadingAnimation>
            </Flex>
        )
    }

    return (
        <>
            {!limit && (
                <InfiniteComponent />
            )}
            {limit && (
                <LimitedComponent />
            )}
        </>
    )

}

export default EventListing
