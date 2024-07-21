import { AddChatIcon, SearchTwoIcon } from '@/components/svg'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function ListHeader() {
    return (
        <Flex w={"full"} h={"72px"} px={"6"} borderBottomWidth={"1px"} borderBottomColor={"#F1F1F1"} justifyContent={"space-between"} alignItems={"center"} >
            <Text lineHeight={"36px"} fontSize={"20px"} fontWeight={"700"} >Community</Text>
            <Flex gap={"5"} >
                <SearchTwoIcon/>
                <AddChatIcon />
            </Flex>
        </Flex>
    )
}
