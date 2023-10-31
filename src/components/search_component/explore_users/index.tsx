import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import PeopleCard from '../other_components/people_card'

interface Props { }

function ExploreUser(props: Props) {
    const { } = props

    const searchValue = ""
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: `/user/search-users?searchText=${searchValue}`, limit: 10, filter: "userId" })

    return (
        <Flex width={"full"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <LoadingAnimation length={results?.length} loading={isLoading} refeching={isRefetching} >
                {results?.map((person: any, i: number) => {
                    if (results.length === i + 1) {
                        return (
                            <Box key={person?.userId} width={"full"} ref={ref} >
                                <PeopleCard  person={person}/> 
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={person?.userId} width={"full"}>
                                <PeopleCard person={person}/> 
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default ExploreUser
