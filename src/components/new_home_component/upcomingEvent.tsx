import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import useCustomTheme from '@/hooks/useTheme'
import { Flex, Grid, GridItem, Skeleton, Text } from '@chakra-ui/react'

interface Props {
    mobile?: boolean,
}

function UpcomingEvent(props: Props) {
    const {
        mobile
    } = props


    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
        headerTextColor
    } = useCustomTheme();
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/events/events`, limit: 20, filter: "id", name: "listofevent" })

    return (
        <Flex bg={mainBackgroundColor} justifyContent={"center"} w={"full"} pt={"8"} h={"full"} flexDirection={"column"} >
            <Text fontWeight={"semibold"} textAlign={"left"} fontSize={"20px"} mt={"15px"} pb={["4", "4", "4", "10", "10"]} ml={"8"}>{"Upcoming Event"}</Text>

            <Flex w={"full"} gap={"4"} flexDirection={["row", "row", "row", "column", "column"]} h={"full"} overflowY={"auto"} pb={["3", "3", "3", "0px", "0px"]} overflowX={"auto"} 
            // sx={
            //     {
            //         '::-webkit-scrollbar': {
            //             display: 'none'
            //         }
            //     }
            // } 
            >
                <Flex w={["fit-content", "fit-content", "fit-content", "full", "full"]} flexDir={"column"} >
                    <LoadingAnimation loading={isLoading} customLoader={
                        <Grid width={["full", "full", "full", "full", "full"]} templateColumns={'repeat(2, 1fr)'} gap={"4"} px={"6"} >
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                            <GridItem maxWidth={["full", "full", "full", "full", "full"]}  >
                                <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={"300px"} />
                            </GridItem>
                        </Grid>
                    } refeching={isRefetching} length={results?.length} >
                        <>
                            <Grid templateColumns='repeat(2, 1fr)' gap={4} width={["full", "full", "full", "full", "full"]} h={"fit-content"} px={"6"} flexDir={["row", "row", "row", "column", "column"]}>
                                {results?.map((event: any, i: number) => {
                                    if (results.length === i + 1) {
                                        return (
                                            <Flex key={i} w={["80vw", "350px", "350px", "full", "full"]} ref={ref} >
                                                <ExploreEventCard upcoming={true} eventdashboard={true} date={true} page={true} event={event} />
                                            </Flex>
                                        )
                                    } else {
                                        return (
                                            <Flex key={i + "last"} w={["80vw", "350px", "350px", "full", "full"]}  >
                                                <ExploreEventCard upcoming={true} eventdashboard={true} date={true} page={true} event={event} />
                                            </Flex>
                                        )
                                    }
                                })}
                            </Grid>
                        </>
                    </LoadingAnimation>
                </Flex>
            </Flex>
        </Flex>
    )

}

export default UpcomingEvent
