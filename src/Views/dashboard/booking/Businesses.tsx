import React from 'react'
import { Box, Flex, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useMutation, useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { IService } from '@/models/Service';


function Businesses() {
    const [businesses, setBusinesses] = React.useState<IService[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);

    const { isLoading, } = useQuery(['get-businesses', page], () => httpService.get('/business-service/search', {
        params: {
            page,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IService> = data.data;
            const reversed = uniqBy([...businesses, ...item.content], 'id');
            setBusinesses(reversed);
            if (item?.last) {
                setHasMore(false);
            }
        }
    });


    return (
        <Flex flexDirection={"column"} w='full' h='full' pt='8'>
            {!isLoading && businesses.length > 0 && (
                <SimpleGrid columns={[1, 3]} pb={8} gap={[2, 4]}>
                    {businesses.map((item, index) => (
                        <BusinessCard key={index.toString()} business={item} />
                    ))}
                </SimpleGrid>
            )}

            {!isLoading && businesses.length < 1 && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Text>There are currently no business, you can start by creating one!</Text>
                </VStack>
            )}

            {isLoading && (
                <VStack w='full' h='80px' borderRadius={'20px'} justifyContent={'center'} >
                    <Spinner size={'sm'} />
                    <Text>Loading Businesses</Text>
                </VStack>
            )}
        </Flex>
    )
}

export default Businesses
