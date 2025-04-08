"use client"
import React from 'react'
import { Box, Grid, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { cleanup } from '@/utils/cleanupObj';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';

function MyBusiness({ name, state, category, isSelect, selected, setSelected }: { name?: string, state?: string, category?: string, isSelect?: boolean, selected?: Array<string>, setSelected?: any }) {

    const userId = localStorage.getItem('user_id'); 

    const { results, isLoading, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/business-service/search`, limit: 20, filter: "id", name: "mybusinessservice", paramsObj: cleanup({
            name: name,
            vendorID: userId,
            category: category,
            state: state
        })
    })

    return (
        <LoadingAnimation loading={isLoading} refeching={refetchingList} length={results?.length} > 
            <Box w='full' h='full' >
                {!isLoading && results.length > 0 && (
                    <Grid w={"full"} templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["2", "2", "2"]} >
                        {results.map((item: any, index: number) => (
                            <BusinessCard key={index.toString()} business={item} mybusiness={true} selected={selected} setSelected={setSelected} isSelect={isSelect} />
                        ))}
                    </Grid>
                )} 
            </Box>
        </LoadingAnimation>
    )
}

export default MyBusiness
