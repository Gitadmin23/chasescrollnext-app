import { Flex } from '@chakra-ui/react'
import React from 'react'
import ExploreCommunity from '../search_component/explore_communities'
import useSearchStore from '@/global-state/useSearchData';
import SearchBar from '../explore_component/searchbar';
import { Box } from 'iconsax-react';
import useCustomTheme from '@/hooks/useTheme';

export default function FindCommunity() {   

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    
    return (
        <Flex w={"full"} h={"full"} pos={"relative"} flex={"1"} alignItems={"center"} flexDir={"column"}  >
            <Flex h={"90px"} w={"full"} bgColor={mainBackgroundColor} justifyContent={"center"} alignItems={"center"} maxW={"400px"}  >
                <SearchBar />
            </Flex>
            <Flex w={"full"} pos={"absolute"} top={"90px"} bottom={"0px"} insetX={"0px"} flexDir={"column"} overflowY={"auto"} px={"8"} >
                <ExploreCommunity />
            </Flex> 
        </Flex>
    )
}
