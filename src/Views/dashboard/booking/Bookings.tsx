import React from 'react'
import { Box, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import { IBooking } from '@/models/Booking';
import BookingCard from '@/components/booking_component/BookingCard';
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import usePaystackStore from '@/global-state/usePaystack';

function Bookings() {
    const [businesses, setBusinesses] = React.useState<IBooking[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const { userId } = useDetails((state) => state);
    const { configPaystack, setPaystackConfig, donation, dataID, booking } = usePaystackStore((state) => state);

    const { isLoading, } = useQuery(['get-my-businesses', page], () => httpService.get('/booking/search', {
        params: {
            userID: userId,
            page,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IBooking> = data.data;
            setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
            if (item?.last) {
                setHasMore(false);
            }
        }
    })
    return (
        <Box w='full' h='full' pt='30px'>
            {!isLoading && businesses.length > 0 && (
                <SimpleGrid columns={[1, 3]} gap={[2, 4]}>
                    {businesses.map((item, index) => (
                        <BookingCard booking={item} business={item?.vendor} isVendor={false} />
                    ))}
                </SimpleGrid>
            )}

            {!isLoading && businesses.length < 1 && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Text>There are currently no bookings, you can start by creating one!</Text>
                </VStack>
            )}

            {isLoading && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Spinner />
                    <Text>Loading Your Booking</Text>
                </VStack>
            )} 
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} booking={booking} donation={donation} />
        </Box>
    )
}

export default Bookings
