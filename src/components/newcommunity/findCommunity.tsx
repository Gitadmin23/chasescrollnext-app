import { Flex } from '@chakra-ui/react'
import React from 'react'
import ExploreCommunity from '../search_component/explore_communities'
import useSearchStore from '@/global-state/useSearchData';
import SearchBar from '../explore_component/searchbar';

export default function FindCommunity() { 

    const { search, setSearchValue } = useSearchStore((state) => state);
    
    return (
        <Flex w={"full"} h={"full"} alignItems={"center"} flexDir={"column"}  >
            <Flex h={"fit-content"} w={"full"} py={"4"}  maxW={"400px"}  >
                <SearchBar />
            </Flex>
            <Flex w={"full"} h={"full"} overflowY={"auto"} px={"8"} >
                <ExploreCommunity />
            </Flex>
        </Flex>
    )
}
