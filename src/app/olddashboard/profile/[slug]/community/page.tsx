"use client"
import CommunityCard from '@/components/search_component/other_components/community_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { URLS } from '@/services/urls';
import { Box, Grid, HStack } from '@chakra-ui/react'
import React from 'react'

function Community({ params }: { params: { slug: string } }) {


    // const { search, setSearchValue } = useSearchStore((state) => state); 

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_JOINED_GROUPS + "?userID=" + params?.slug, limit: 10, filter: "id" })

    return (
        <HStack height={"fit-content"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"}  >
            {/* <Box width={["full", "full", "fit-content"]} px={"6"} position={"relative"} py={"6"} > */}

            <Grid width={"fit-content"} templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(3, 1fr)']} gap={6} >
                <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                    {results?.map((community: any, i: number) => {
                        if (results?.length === i + 1) {
                            return (
                                <Box ref={ref} key={i} width={"full"} borderBottomWidth={"1px"} rounded={"3xl"} px={"4"} pb={"2"}>
                                    <CommunityCard profile={true} data={community} />
                                </Box>
                            )
                        } else {
                            return (
                                <Box key={i} width={"full"} borderBottomWidth={"1px"} rounded={"3xl"} px={"4"} pb={"2"}>
                                    <CommunityCard profile={true} data={community} />
                                </Box>
                            )
                        }
                    })}
                </LoadingAnimation>
            </Grid>
            {/* </Box> */}
        </HStack>
    )
}

export default Community