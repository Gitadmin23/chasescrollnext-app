import React from 'react'
import { Box, Flex, Grid, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useMutation, useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { IService } from '@/models/Service';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { cleanup } from '@/utils/cleanupObj';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';


function Businesses({ name, state, category }: { name?: string, state?: string, category?: string }) {
    const [businesses, setBusinesses] = React.useState<IService[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);

    // const { isLoading, } = useQuery(['get-businesses', page], () => httpService.get('/business-service/search', {
    //     params: {
    //         page,
    //         size: 50,
    //     }
    // }), {
    //     onSuccess: (data) => {
    //         console.log(data?.data?.content)
    //         const item: PaginatedResponse<IService> = data.data;
    //         const reversed = uniqBy([...businesses, ...item.content], 'id');
    //         setBusinesses(reversed);
    //         if (item?.last) {
    //             setHasMore(false);
    //         }
    //     }
    // });


    const { results, isLoading, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/business-service/search`, limit: 20, filter: "id", name: "getProduct", paramsObj: cleanup({
            name: name,
            category: category,
            state: state
        })
    })


    return (
        <LoadingAnimation loading={isLoading} refeching={refetchingList} length={results?.length} >

            <Flex flexDirection={"column"} w='full' h='full' pt='8'>
                {!isLoading && results.length > 0 && (
                    <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                        {results.map((item: any, index: number) => (
                            <BusinessCard key={index.toString()} business={item} />
                        ))}
                    </Grid>
                )}

                {/* {!isLoading && businesses.length < 1 && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Text>There are currently no business, you can start by creating one!</Text>
                </VStack>
            )}

            {isLoading && (
                <VStack w='full' h='80px' borderRadius={'20px'} justifyContent={'center'} >
                    <Spinner size={'sm'} />
                    <Text>Loading Businesses</Text>
                </VStack>
            )} */}
            </Flex>
        </LoadingAnimation>
    )
}

export default Businesses
