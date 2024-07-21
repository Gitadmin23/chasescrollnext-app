import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useCommunity } from '.'
import RequestCard from './components/RequestCard'

export default function CommunityRequest() {

    const { communityRequest } = useCommunity()

    return (
        <Flex w={"full"} h={"full"} alignItems={"center"} flexDir={"column"} >
            {/* <Flex h={"fit-content"} w={"full"} py={"4"} maxW={"400px"}  >
                <SearchBar />
            </Flex> */}
            <Flex w={"full"} h={"full"} pt={"8"} pb={"4"} alignItems={"start"} overflowY={"auto"} px={"8"} >
                {communityRequest?.map((item: any, index: number) => {
                    return (
                        <Box w={"full"} key={index}>
                            <RequestCard community={item} />
                        </Box>
                    )
                })}
            </Flex>
        </Flex>
    )
}
