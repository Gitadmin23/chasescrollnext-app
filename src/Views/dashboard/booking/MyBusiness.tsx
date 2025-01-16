import React from 'react'
import { Box, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';

function MyBusiness() {
    const [businesses, setBusinesses] = React.useState<IBuisness[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const { userId } = useDetails((state) => state);

    const { isLoading, } = useQuery(['get-my-businesses', page], () => httpService.get('/business/search', {
        params: {
            userID: userId,
            page,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IBuisness> = data.data;
            setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
            if(item?.last) {
                setHasMore(false);
            }
        }
    })
  return (
    <Box w='full' h='full' pt='30px'>
        {!isLoading && businesses.length > 0 && (
            <SimpleGrid columns={[1, 3]} gap={[2, 4]}>
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
                <Spinner />
                <Text>Loading Businesses</Text>
            </VStack>
        )}
    </Box>
  )
}

export default MyBusiness
