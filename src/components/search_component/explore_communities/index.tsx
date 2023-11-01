import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box } from '@chakra-ui/react'
import React from 'react'
import CommunityCard from '../other_components/community_card'
import useSearchStore from '@/global-state/useSearchData'

interface Props { 
    searchbar?: boolean
}

function ExploreCommunity(props: Props) {
    const { 
        searchbar
    } = props

    // const { search, setSearchValue } = useSearchStore((state) => state);
    const searchValue = useSearchStore((state) => state.search);

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/group/find-groups?searchText=${searchValue}`, limit: 10, filter: "userId" })

    return (
        <Box borderWidth={"0px"} width={"full"} p={"3"} >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                {results?.map((community: any, i: number) => {
                    if (results?.length === i + 1) {
                        return (
                            <Box ref={ref} key={i} width={"full"}>
                                <CommunityCard searchbar={searchbar} data={community} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={i} width={"full"}>
                                <CommunityCard searchbar={searchbar} data={community} />
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Box>
    )
}

export default ExploreCommunity
