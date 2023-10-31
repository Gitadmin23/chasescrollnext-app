import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box } from '@chakra-ui/react'
import React from 'react'
import CommunityCard from '../other_components/community_card'

interface Props { }

function ExploreCommunity(props: Props) {
    const { } = props

    const searchValue = ""

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/group/find-groups?searchText=${searchValue}`, limit: 10, filter: "userId" })

    return (
        <Box borderWidth={"1px"} width={"full"} p={"3"} >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                {results?.map((community: any, i: number) => {
                    if (results?.length === i + 1) {
                        return (
                            <Box ref={ref} key={i} width={"full"}>
                                <CommunityCard data={community} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={i} width={"full"}>
                                <CommunityCard data={community} />
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Box>
    )
}

export default ExploreCommunity
